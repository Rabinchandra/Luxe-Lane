import FilterCategory from "@/components/products/FilterCategory";
import SearchProductResult from "@/components/products/SearchProductResult";
import SearchResult from "@/components/products/SearchResult";
import React from "react";

function page() {
  return (
    <main className="mx-14 my-10 flex">
      <aside className="w-[200px]">
        <FilterCategory />
        <SearchProductResult />
      </aside>
      <section className="ml-16">
        <SearchResult />
      </section>
    </main>
  );
}

export default page;
