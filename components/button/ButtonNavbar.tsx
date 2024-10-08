import { AppContext } from "@/context/AppContext";
import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { NextRouter } from "next/router";
import React, { useContext } from "react";

type ButtonNavbarProps = {
  path: string;
  label: string;
  icon: React.ReactNode;
  router: NextRouter;
  status?: "authenticated" | "loading" | "unauthenticated";
};

export default function ButtonNavbar({
  path,
  label,
  icon,
  router,
  status,
}: ButtonNavbarProps) {
  const ctx = useContext(AppContext);

  function checkPath(path: string) {
    if (router.pathname == path) {
      return "text-primary";
    }

    if (path == "/products") {
      if (
        router.pathname == "/products/search" ||
        router.pathname == "/category/[name]"
      ) {
        return "text-primary";
      }
    }

    return "text-foreground-600";
  }

  if (path == "/cart") {
    if (status == "unauthenticated") {
      return (
        <Link
          href={path}
          className={`grid place-items-center ${router.pathname == path ? "text-primary" : "text-foreground-600"}`}
          onClick={(e) => {
            if (status == "unauthenticated") {
              e.preventDefault();
              ctx?.onOpenUnauthenticated();
            }
          }}
        >
          <>{icon}</>
          <span className="text-[10px] font-medium">{label}</span>
        </Link>
      );
    }

    return (
      <Badge color="danger" content={ctx?.totalCarts}>
        <Link
          href={path}
          className={`grid place-items-center ${router.pathname == path ? "text-primary" : "text-foreground-600"}`}
        >
          <>{icon}</>
          <span className="text-[10px] font-medium">{label}</span>
        </Link>
      </Badge>
    );
  }

  if (path == "/profile") {
    return (
      <Link
        href={path}
        className={`grid place-items-center ${router.pathname == path ? "text-primary" : "text-foreground-600"}`}
        onClick={(e) => {
          if (status == "unauthenticated") {
            e.preventDefault();
            ctx?.onOpenUnauthenticated();
          }
        }}
      >
        <>{icon}</>
        <span className="text-[10px] font-medium">{label}</span>
      </Link>
    );
  }

  return (
    <Link href={path} className={`grid place-items-center ${checkPath(path)}`}>
      <>{icon}</>
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
