"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

function SearchInput() {
  const [input, setInput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

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
          onChange={handleInput}
        />
      </section>
      {input.length === 0 && (
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
