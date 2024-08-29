import { ProductOrder } from "@/types/preview.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export default function CardOrder(item: ProductOrder) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-4">
      <div className="overflow-hidden rounded-lg border border-foreground-200">
        <Image
          priority
          isBlurred
          as={NextImage}
          src={item.image[0].url}
          alt="image"
          width={500}
          height={500}
          className="size-20"
        />
      </div>

      <div className="grid gap-3">
        <div>
          <h4 className="line-clamp-2 text-[12px] font-semibold text-foreground">
            {item.nama_produk_asli}
          </h4>
          <p className="text-[10px] font-medium text-foreground-600">
            {item.kategori}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-[12px] font-medium text-foreground">
            {item.quantity} x {formatRupiah(item.harga)}
          </h4>
          <h4 className="text-[12px] font-semibold text-foreground">
            {formatRupiah(item.subtotal_produk)}
          </h4>
        </div>
      </div>
    </div>
  );
}
