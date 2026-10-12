"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = { selected: string; choose: (slug: string) => void };
const QuoteCtx = createContext<Ctx>({ selected: "", choose: () => {} });

/** Comparte el seguro elegido en las tarjetas con el formulario de cotización. */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState("");
  const choose = useCallback((slug: string) => {
    setSelected(slug);
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const value = useMemo(() => ({ selected, choose }), [selected, choose]);
  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export const useQuote = () => useContext(QuoteCtx);
