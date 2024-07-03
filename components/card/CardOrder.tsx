import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export default function CardOrder() {
  return (
    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
      <Image
        priority
        isBlurred
        as={NextImage}
        src="/img/product-img-1.webp"
        alt="image"
        width={500}
        height={500}
        className="h-[100px] w-[100px] rounded-xl"
      />

      <div className="grid gap-2">
        <div>
          <h4 className="line-clamp-2 text-sm font-bold text-foreground">
            Besi Beton KS (Krakatau Steel) 12mm Polos TP280
          </h4>
          <p className="text-[12px] font-medium text-foreground-600">
            Besi Baja
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-foreground">2 x Rp 130.000</h4>
          <h4 className="text-sm font-bold text-foreground">Rp 260.000</h4>
        </div>
      </div>
    </div>
  );
}
