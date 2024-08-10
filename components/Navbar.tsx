import {
  House,
  ShoppingCart,
  SquaresFour,
  UserCircle,
} from "@phosphor-icons/react";

import ButtonNavbar from "@/components/button/ButtonNavbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { status } = useSession();

  if (status == "loading") {
    return;
  }

  return (
    <nav className="absolute bottom-0 left-0 z-50 h-24 w-full bg-white">
      <div className="container flex h-full items-center justify-between px-12">
        <ButtonNavbar
          path="/"
          label="Utama"
          icon={<House weight="duotone" size={24} />}
          router={router}
        />

        <ButtonNavbar
          path="/products"
          label="Produk"
          icon={<SquaresFour weight="duotone" size={24} />}
          router={router}
        />

        <ButtonNavbar
          path="/cart"
          label="Keranjang"
          icon={<ShoppingCart weight="duotone" size={24} />}
          router={router}
          status={status}
        />

        <ButtonNavbar
          path="/profile"
          label="Profil"
          icon={<UserCircle weight="duotone" size={24} />}
          router={router}
          status={status}
        />
      </div>
    </nav>
  );
}
