import { products } from "@/_dummy/products";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/card/CardProduct";
import { Chip, Image } from "@nextui-org/react";
import { Circle } from "@phosphor-icons/react";
import NextImage from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <Layout
      title="TB Sinar Baja : Temukan Berbagai Produk Baja Berkualitas Untuk Kebutuhan Proyek Anda Disini."
      className="relative"
    >
      <Navbar />

      <div className="grid gap-2">
        <div className="flex items-end justify-between gap-4 pb-4 pt-8">
          <div>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              Selamat Pagi, Gufron.
            </h3>
            <p className="max-w-[300px] text-sm font-medium text-foreground-600">
              Cari Besi Berkualitas Tinggi dan Terpercaya Di Sini.
            </p>
          </div>

          <Chip
            variant="flat"
            color="success"
            size="sm"
            startContent={
              <Circle weight="fill" size={7} className="animate-ping" />
            }
            className="gap-1"
            classNames={{
              base: "px-2",
              content: "font-semibold",
            }}
          >
            Toko Aktif
          </Chip>
        </div>

        <div className="mb-2 aspect-video overflow-hidden rounded-xl">
          <Image
            priority
            isBlurred
            as={NextImage}
            src="/img/dummy-banner.webp"
            alt="banner"
            width={1920}
            height={1080}
            className="h-auto w-full object-cover object-center"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-semibold text-foreground">Produk Terbaru</h4>
            <Link
              href="/products?sort=newest"
              className="text-[12px] font-semibold text-primary"
            >
              Lihat Semua Produk
            </Link>
          </div>

          <div className="grid grid-cols-2 items-start gap-4 overflow-scroll pb-32">
            {products.map((product) => (
              <CardProduct key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
