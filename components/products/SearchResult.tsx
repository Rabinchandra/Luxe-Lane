"use client";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useSearchContext } from "@/context/SearchContext";

function SearchResult() {
  const { matchProducts } = useSearchContext();

  useEffect(() => {
    console.log("Match", matchProducts);
  }, [matchProducts]);

  return (
    <main>
      <motion.header
        className="font-bold text-xl mb-8"
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 10 }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 1,
        }}
      >
        Search Result here
      </motion.header>
      <div className="search-result grid grid-cols-4 gap-10">
        {/* {matchProducts.map((d, index) => (
          <ProductCard
            key={`product-card-${index}`}
            name={d.name}
            category={d.category}
            imgUrl={d.images[0]}
            price={d.price}
            rating={d.rating}
            index={index}
            id={d.id}
          />
        ))} */}
      </div>
    </main>
  );
}

export default SearchResult;
