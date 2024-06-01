import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Layout({ children, className }: LayoutProps) {
  return (
    <main className={`mx-auto h-dvh max-w-[480px] ${className}`}>
      <div className="container h-full">{children}</div>
    </main>
  );
}
