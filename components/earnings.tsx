"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { site } from "@/lib/site";

type EarningsValue = {
  booklets: number;
  products: number;
  setBooklets: (value: number) => void;
  setProducts: (value: number) => void;
  bookletTotal: number;
  productTotal: number;
  total: number;
};

const EarningsContext = createContext<EarningsValue | null>(null);

export function EarningsProvider({ children }: { children: React.ReactNode }) {
  const [booklets, setBooklets] = useState(100);
  const [products, setProducts] = useState(40);

  const value = useMemo(() => {
    const bookletTotal = booklets * site.bookletKronor;
    const productTotal = products * site.productKronor;
    return {
      booklets,
      products,
      setBooklets,
      setProducts,
      bookletTotal,
      productTotal,
      total: bookletTotal + productTotal,
    };
  }, [booklets, products]);

  return <EarningsContext.Provider value={value}>{children}</EarningsContext.Provider>;
}

export function useEarnings() {
  const value = useContext(EarningsContext);
  if (!value) {
    throw new Error("Kalkylatorn måste ligga inuti EarningsProvider.");
  }
  return value;
}
