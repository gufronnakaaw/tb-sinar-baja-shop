import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type ButtonNavbarProps = {
  path: string;
  label: string;
  icon: React.ReactNode;
};

export default function ButtonNavbar({ path, label, icon }: ButtonNavbarProps) {
  const router = useRouter();

  return (
    <>
      {path == "/cart" ? (
        <Badge color="danger" content={"5"}>
          <Link
            href={path}
            className={`grid place-items-center ${router.pathname == path ? "text-primary" : "text-foreground-600"}`}
          >
            <>{icon}</>
            <span className="text-[12px] font-semibold">{label}</span>
          </Link>
        </Badge>
      ) : (
        <Link
          href={path}
          className={`grid place-items-center ${router.pathname == path ? "text-primary" : "text-foreground-600"}`}
        >
          <>{icon}</>
          <span className="text-[12px] font-semibold">{label}</span>
        </Link>
      )}
    </>
  );
}
