"use client";
import FilterCategory from "@/components/products/FilterCategory";
import SortBy from "@/components/products/SortBy";
import SearchResult from "@/components/products/SearchResult";
import React from "react";

function page() {
  return (
    <main className="mx-14 my-10 flex">
      <aside className="w-[300px]">
        <FilterCategory />
        <SortBy />
      </aside>
      <section className="flex-1">
        <SearchResult />
      </section>
    </main>
  );
}

export default page;
