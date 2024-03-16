"use client";
import React, { useEffect } from "react";
import algoliasearch from "algoliasearch";

function SearchAlgo() {
  const searchProducts = async (query: string) => {
    const client = algoliasearch(
      "61K89SD3KF",
      "aca5cb2a6d51386a56dc1e10517e8554"
    );
    const index = client.initIndex("merged");

    const response = await index.search(query, {
      // Optional parameters for filtering and sorting
    });

    return response.hits;
  };

  useEffect(() => {
    async function getData() {
      const results = await searchProducts("Laptop");
      console.log(results);
    }

    getData();
  }, []);

  return <div>SearchAlgo</div>;
}

export default SearchAlgo;
