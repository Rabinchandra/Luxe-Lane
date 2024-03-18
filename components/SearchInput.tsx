"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import algoliasearch from "algoliasearch";
import { useSearchContext } from "@/context/SearchContext";
import { Product } from "@/utilities/types";

function SearchInput() {
  const [input, setInput] = useState<string>("");
  const { matchProducts, setMatchProducts } = useSearchContext();
  const [changeInput, setChangeInput] = useState<string>("");

  const handleInput = async (e: any) => {
    if (e.keyCode === 13) {
      setInput(e.target.value);
    }
  };

  // For Animation TypeWritter Effect in the input - input change
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setChangeInput(e.target.value);
  };

  // Algolia Search products
  const searchProducts = async (query: string) => {
    const client = algoliasearch(
      "61K89SD3KF",
      "aca5cb2a6d51386a56dc1e10517e8554"
    );
    const index = client.initIndex("merged");

    const response = await index.search(query);

    return response.hits;
  };

  useEffect(() => {
    async function getData() {
      // if the user hit enter key, then find search the products that matches the given input
      const res = await searchProducts(input);
      const data: Product[] = [];

      // Extract the id and name from each product
      res.forEach((item) =>
        data.push({
          id: item.id,
          name: item.name,
          category: item.category,
          images: item.images,
          price: item.price,
          rating: item.rating,
        })
      );
      // Update the update products
      setMatchProducts(data);
    }

    getData();
  }, [input]);

  return (
    <motion.div
      className="search-input border-[1.5px] border-gray-300 py-[10px] px-4 rounded-full flex items-center relative text-sm"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", delay: 1.3 }}
    >
      <section className="flex items-center">
        <Image src={"/search.png"} alt="s" width={25} height={25} />
        <input
          type="text"
          placeholder="Search items"
          className="outline-none block mt-1 ml-2 w-[270px] text-sm bg-transparent"
          onKeyDown={handleInput}
          onChange={handleChangeInput}
        />
      </section>
      {changeInput.length === 0 && (
        <section className="absolute top-[14px] text-gray-400 left-40 flex">
          "
          <Typewriter
            options={{
              strings: [
                "Gaming Phones",
                "Laptops",
                "Men's clothing",
                "Glasswear",
                "Fictional Books",
              ],
              autoStart: true,
              loop: true,
            }}
          />
          "
        </section>
      )}

      <Image
        src={"/microphone.png"}
        width={16}
        height={16}
        alt="s"
        className="cursor-pointer"
      ></Image>
    </motion.div>
  );
}

export default SearchInput;
