"use client";

import { ThemeProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="unified"
      themes={["eco", "trust", "unified"]}
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
