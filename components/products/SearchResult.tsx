"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useSearchContext } from "@/context/SearchContext";

function SearchResult() {
  const { matchProducts } = useSearchContext();
  const [start, setStart] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);

  const handleNext = () => {
    setStart(start + 8);
    scrollTo(0, 0);
    console.log(pages);
  };

  const handlePrev = () => {
    setStart(start - 8);
    scrollTo(0, 0);
  };

  useEffect(() => {
    // When match products is changed, restart the start value for pagination i.e. start from page 1
    setStart(0);
    // Set Page Length
    let pagesLength = ~~(matchProducts.length / 8);
    if (matchProducts.length % 8 !== 0) pagesLength += 1;
    setPages(pagesLength);
  }, [matchProducts]);

  return (
    <main className="search-result">
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
        {matchProducts.slice(start, start + 8).map((d, index) => (
          <ProductCard
            key={`product-card-${index}-${parseInt(Math.random() * 1000)}`}
            name={d.name}
            category={d.category}
            imgUrl={d.images[0] ? d.images[0] : ""}
            price={d.price || 0}
            rating={d.rating}
            index={index}
            id={d.id}
            objectID={d.objectId}
          />
        ))}
      </div>
      <div className="pagination my-16 flex space-x-5 justify-center">
        {start != 0 && (
          <div
            onClick={handlePrev}
            className="text-sm cursor-pointer underline"
          >
            Previous
          </div>
        )}
        {start / 8 + 2 <= pages && (
          <div
            onClick={handleNext}
            className="text-sm cursor-pointer underline"
          >
            Next
          </div>
        )}
      </div>
    </main>
  );
}

export default SearchResult;
