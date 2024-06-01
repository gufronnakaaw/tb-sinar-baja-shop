import Head from "next/head";
import React from "react";

import Footer from "@/components/Footer";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function Layout({ children, title, className }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={`mx-auto h-dvh max-w-[480px] bg-white ${className}`}>
        <div className="container h-full">{children}</div>
      </main>

      <Footer />
    </>
  );
}
