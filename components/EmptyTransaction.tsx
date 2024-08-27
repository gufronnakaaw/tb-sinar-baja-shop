import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export default function EmptyTransaction() {
  return (
    <div className="mt-16 flex flex-col items-center gap-8">
      <Image
        priority
        as={NextImage}
        src="/img/empty-cart-img.svg"
        alt="empty box img"
        width={192}
        height={192}
      />

      <div className="grid justify-items-center gap-4">
        <div className="text-center">
          <h4 className="mx-auto mb-1 max-w-[230px] font-semibold text-foreground">
            Oppsss... transaksi kamu masih kosong
          </h4>
          <p className="text-[12px] font-medium text-foreground-600">
            Cari, pesan, dan terima pesanan yang kamu suka.
          </p>
        </div>
      </div>
    </div>
  );
}
