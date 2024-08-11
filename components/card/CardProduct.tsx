import { Product } from "@/types/product.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export default function CardProduct({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group grid gap-4 rounded-[16px] border border-foreground-200 bg-white p-3 hover:border-primary"
    >
      <div className="aspect-square overflow-hidden rounded-lg">
        <Image
          priority
          isBlurred
          as={NextImage}
          src={`${!product.image.length ? "/img/product-image-test.jpg" : product.image[0].url}`}
          alt="product img"
          width={1000}
          height={1000}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="overflow-hidden">
        <span className="line-clamp-1 text-[10px] text-foreground-600">
          {product.kategori}
        </span>
        <h4 className="mb-3 line-clamp-2 text-[12px] font-medium text-foreground group-hover:text-primary">
          {product.nama_produk_asli}
        </h4>
        <h4 className="line-clamp-1 text-[12px] font-semibold text-primary">
          {formatRupiah(product.harga_6)}
        </h4>
      </div>
    </Link>
  );
}
