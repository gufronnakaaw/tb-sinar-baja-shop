import { House, Receipt, SquaresFour, UserCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";

import ButtonNavbar from "@/components/button/ButtonNavbar";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="absolute bottom-0 left-0 h-24 w-full bg-white">
      <div className="container flex h-full items-center justify-between px-12">
        <ButtonNavbar
          path="/"
          label="Utama"
          icon={<House weight="duotone" size={28} />}
        />

        <ButtonNavbar
          path="/products"
          label="Produk"
          icon={<SquaresFour weight="duotone" size={28} />}
        />

        <ButtonNavbar
          path="/profile/transactions"
          label="Transaksi"
          icon={<Receipt weight="duotone" size={28} />}
        />

        <ButtonNavbar
          path="/profile"
          label="Profil"
          icon={<UserCircle weight="duotone" size={28} />}
        />
      </div>
    </nav>
  );
}
