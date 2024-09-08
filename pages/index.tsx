import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/card/CardProduct";
import { AppContext } from "@/context/AppContext";
import { Banner } from "@/types/banner.type";
import { SuccessResponse } from "@/types/global.type";
import { Product } from "@/types/product.type";
import { fetcher } from "@/utils/fetcher";
import { Chip, Image, Skeleton } from "@nextui-org/react";
import { Circle } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import { useContext } from "react";

export default function HomePage({
  banners,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const ctx = useContext(AppContext);

  return (
    <Layout title="TB Sinar Baja : Temukan Berbagai Produk Baja Berkualitas Untuk Kebutuhan Proyek Anda Disini.">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-4 pb-4 pt-8">
          <h3 className="inline-flex gap-1 text-lg font-bold text-foreground">
            Halo
            {session.status == "loading" ? (
              <Skeleton className="w-[70px] rounded-lg">
                <div className="w-[70px] rounded-lg bg-default-200"></div>
              </Skeleton>
            ) : session.status == "authenticated" ? (
              `, ${session.data.user.nama}`
            ) : (
              ", Pelanggan Setia"
            )}
          </h3>

          {ctx?.isOpen ? (
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
          ) : (
            <Chip
              variant="flat"
              color="danger"
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
              Toko Tidak Aktif
            </Chip>
          )}
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

        <div className="grid gap-8 pb-8">
          <div className="grid gap-2">
            <h4 className="font-semibold text-foreground">Produk Terbaru</h4>

            <div className="grid grid-cols-2 items-start gap-4 overflow-scroll">
              {products.map((product) => (
                <CardProduct key={product.kode_item} product={product} />
              ))}
            </div>
          </div>

          {/* <p className="grid grid-cols-3 items-center text-center text-[10px] font-medium italic text-foreground-400">
            <div className="h-[1px] w-full rounded-full bg-foreground-200">
              Kembali ke atas!
            </div>
            <div className="h-[1px] w-full rounded-full bg-foreground-200"></div>
          </p> */}
        </div>
      </div>

      <Navbar />
    </Layout>
  );
}

export const getServerSideProps = (async () => {
  const response: SuccessResponse<{ banners: Banner[]; newest: Product[] }> =
    await fetcher({
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
