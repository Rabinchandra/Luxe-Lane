"use client";
import { Product } from "@/utilities/types";
import React, { ReactNode, createContext, useState, useContext } from "react";

interface SearchContextType {
  matchProducts: Product[];
  setMatchProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const SearchContext = createContext<SearchContextType>({
  matchProducts: [],
  setMatchProducts: () => {}, // Initial value for setMatchProducts
});

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [matchProducts, setMatchProducts] = useState<Product[]>([]);

  const contextValue = { matchProducts, setMatchProducts };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be defined within SearchContextProvider"
    );
  }

  return context;
}

export default SearchContextProvider;
