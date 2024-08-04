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
      className="group grid gap-4 rounded-xl border border-foreground-200 bg-white p-4 hover:border-primary"
    >
      <Image
        priority
        isBlurred
        as={NextImage}
        src={`${!product.image.length ? "/img/product-image-test.jpg" : product.image[0].url}`}
        alt="product img"
        width={1000}
        height={1000}
        className="aspect-square h-auto w-full origin-center rounded-lg object-cover"
      />

      <div>
        <span className="line-clamp-1 text-[12px] text-foreground-600">
          {product.kategori}
        </span>
        <h4 className="mb-3 line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
          {product.nama_produk}
        </h4>
        <h4 className="line-clamp-1 text-sm font-semibold text-primary">
          {formatRupiah(product.harga_4)}
        </h4>
      </div>
    </Link>
  );
}
