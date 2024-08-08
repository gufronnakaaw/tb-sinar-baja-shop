import AppProvider from "@/context/AppProvider";
import "@/styles/globals.css";
import { fetcher } from "@/utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <NextUIProvider>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <SWRConfig value={{ fetcher: fetcher }}>
          <AppProvider>
            <Toaster />
            <Component {...pageProps} />
          </AppProvider>
        </SWRConfig>
      </SessionProvider>
    </NextUIProvider>
  );
}
