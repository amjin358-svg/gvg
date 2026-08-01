"use client";

import { useDeferredValue, useMemo, useState } from "react";

/**
 * Debounced search input with deferred value for responsive filtering.
 */
export function useDeferredSearch(initial = "") {
  const [query, setQuery] = useState(initial);
  const deferredQuery = useDeferredValue(query);

  return useMemo(
    () => ({
      query,
      deferredQuery,
      setQuery,
    }),
    [query, deferredQuery],
  );
}
