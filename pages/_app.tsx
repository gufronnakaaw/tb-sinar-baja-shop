import AppProvider from "@/context/AppProvider";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextNProgress color="#006FEE" />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </NextUIProvider>
  );
}
