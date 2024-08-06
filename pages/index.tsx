import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/card/CardProduct";
import { Banner } from "@/types/banner.type";
import { SuccessResponse } from "@/types/global.type";
import { Product } from "@/types/product.type";
import { serverFetcher } from "@/utils/fetcher";
import { Chip, Image } from "@nextui-org/react";
import { Circle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NextImage from "next/image";
import Link from "next/link";

export default function HomePage({
  banners,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      title="TB Sinar Baja : Temukan Berbagai Produk Baja Berkualitas Untuk Kebutuhan Proyek Anda Disini."
      className="relative"
    >
      <Navbar />

      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-4 pb-4 pt-8">
          <h3 className="text-lg font-bold text-foreground">
            Selamat Malam, Winda.
          </h3>

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
          {banners.length
            ? banners.map((banner, index) => {
                return (
                  <Image
                    key={banner.url}
                    priority
                    isBlurred
                    as={NextImage}
                    src={banner.url}
                    alt={`banner ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="h-auto w-full object-cover object-center"
                  />
                );
              })
            : null}
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
              <CardProduct key={product.kode_item} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const response: SuccessResponse<{ banners: Banner[]; newest: Product[] }> =
    await serverFetcher({
      url: "/homepage",
      method: "GET",
    });

  const { banners, newest: products } = response.data;

  return {
    props: {
      banners,
      products,
    },
  };
}) satisfies GetServerSideProps<{ banners: Banner[]; products: Product[] }>;
