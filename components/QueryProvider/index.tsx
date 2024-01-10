"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSession } from "next-auth/react";

const queryClient = new QueryClient();

function QueryProvider({ children }: { children: React.ReactNode }) {
  const { data: session , status}   = useSession()

  queryClient.setDefaultOptions({
    queries: {
      enabled: status === 'authenticated' && session !== undefined,
      staleTime: 10000, // only eligible to refetch after 10 seconds
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default QueryProvider;
