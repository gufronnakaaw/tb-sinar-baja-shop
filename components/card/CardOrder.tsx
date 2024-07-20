import { formatRupiah } from "@/utils/formatRupiah";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export default function CardOrder() {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-4">
      <Image
        priority
        isBlurred
        as={NextImage}
        src="/img/product-img-1.webp"
        alt="image"
        width={500}
        height={500}
        className="h-[80px] w-[80px] rounded-lg"
      />

      <div className="grid gap-2">
        <div>
          <h4 className="line-clamp-2 text-sm font-semibold text-foreground">
            Besi Beton KS (Krakatau Steel) 12mm Polos TP280
          </h4>
          <p className="text-[12px] font-medium text-foreground-600">
            Besi Baja
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-foreground">
            2 x {formatRupiah(130000)}
          </h4>
          <h4 className="text-sm font-semibold text-foreground">
            {formatRupiah(260000)}
          </h4>
        </div>
      </div>
    </div>
  );
}
