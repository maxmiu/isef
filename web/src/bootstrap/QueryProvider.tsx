import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

export function QueryProvider(props: PropsWithChildren<unknown>) {
    return (
      <QueryClientProvider client={queryClient}>
          {props.children}
      </QueryClientProvider>
    );
}