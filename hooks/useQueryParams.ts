"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// https://github.com/vercel/next.js/discussions/47583#discussioncomment-5666720

/**
 * Custom hook to manage query parameters in the URL.
 *
 * @returns {queryParams} - Object containing the current query parameters.
 * @returns {setQueryParams} - Function to update the query parameters and navigate to the new URL.
 */
function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries()) as Partial<T>;
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  /**
   * Sets the query parameters, updates the URL, and navigates to the new URL.
   *
   * @param params - Partial<T> - An object containing the new query parameters.
   */
  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  }

  return { queryParams, setQueryParams };
}

export default useQueryParams;
