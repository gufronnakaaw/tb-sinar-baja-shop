import { AppContext } from "@/context/AppContext";
import Head from "next/head";
import React, { useContext } from "react";
import PopupUnauthenticated from "./popup/PopupUnauthenticated";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function Layout({ children, title, className }: LayoutProps) {
  const ctx = useContext(AppContext);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main
        className={`relative mx-auto h-dvh max-w-[480px] bg-white ${className}`}
      >
        <div className="container h-full overflow-scroll">
          <PopupUnauthenticated
            isOpen={ctx?.isOpenUnauthenticated as boolean}
            onClose={ctx?.onCloseUnauthenticated as () => void}
          />

          {children}
        </div>
      </main>
    </>
  );
}
