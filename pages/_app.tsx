import AppProvider from "@/context/AppProvider";
import "@/styles/globals.css";
import { fetcher } from "@/utils/fetcher";
import { NextUIProvider } from "@nextui-org/react";
import { getSession, SessionProvider, signOut } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    window.onfocus = async () => {
      if (!router.pathname.startsWith("/auth")) {
        const session = await getSession();

        if (!session) {
          await signOut({
            redirect: false,
          });
        }
      }
    };

    const register = localStorage.getItem("register");
    if (register) {
      if (router.pathname != "/profile/address/create") {
        router.push("/profile/address/create?from=register");
      }
    }
  }, [router]);

  return (
    <NextUIProvider>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <SWRConfig value={{ fetcher: fetcher }}>
          <AppProvider>
            <Toaster position="top-center" />
            <Component {...pageProps} />
          </AppProvider>
        </SWRConfig>
      </SessionProvider>
    </NextUIProvider>
  );
}
