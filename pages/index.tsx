import { products } from "@/_dummy/products";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/card/CardProduct";
import { Image, Input } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
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
        <header className="sticky left-0 top-0 z-50 flex h-20 items-center gap-4 bg-white">
          <Input
            isRequired
            variant="bordered"
            color="default"
            labelPlacement="outside"
            startContent={
              <MagnifyingGlass
                weight="duotone"
                size={24}
                className="text-foreground-400"
              />
            }
            placeholder="Cara produk disini"
          />

          {/* <Badge color="danger" content="5">
            <Button isIconOnly variant="light" color="primary">
              <ShoppingCart
                weight="duotone"
                size={24}
                className="text-primary"
              />
            </Button>
          </Badge> */}
        </header>

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
