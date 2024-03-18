"use client";
import FilterCategory from "@/components/products/FilterCategory";
import SortBy from "@/components/products/SortBy";
import SearchResult from "@/components/products/SearchResult";
import React from "react";

function page() {
  return (
    <main className="mx-14 my-10 flex relative">
      <aside className="w-[300px] sticky top-3">
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
