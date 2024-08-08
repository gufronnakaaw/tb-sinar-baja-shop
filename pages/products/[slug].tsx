import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import PopupPurchaseAmount from "@/components/popup/PopupPurchaseAmount";
import { SuccessResponse } from "@/types/global.type";
import { ProductDetail } from "@/types/product.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Image } from "@nextui-org/react";
import { Plus, Tag } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailsPage({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return;
  }

  return (
    <Layout title="Detail Page">
      <div className="relative">
        <HeaderTitle
          path="/"
          label="Detail Produk"
          className="sticky left-0 top-0"
        />

        <div className="mb-8 grid gap-4">
          <Image
            as={NextImage}
            src={`${!product.image.length ? "/img/product-image-test.jpg" : product.image[0].url}`}
            alt="product img"
            width={1000}
            height={1000}
            className="mb-2 aspect-square h-auto w-full rounded-xl"
          />

          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-bold text-primary">
              {formatRupiah(product.harga_6)}
            </h3>
            <p className="inline-flex items-center text-sm font-medium text-foreground-600">
              <Tag weight="fill" size={16} className="mr-2 text-amber-500" />
              {product.terjual} terjual
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-[20px] font-semibold text-foreground">
              {product.nama_produk_asli}
            </h4>
          </div>

          <div className="mb-4 grid gap-2">
            <h3 className="border-l-4 border-primary pl-4 font-semibold text-foreground">
              Detail Produk
            </h3>

            <div className="grid gap-1">
              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Kategori
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{product.kategori}</p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Berat
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{product.berat ?? "-"}</p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Volume
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">
                  {product.volume ?? "-"}
                </p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Satuan
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">
                  {product.satuan_kecil ?? "-"}
                </p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Merk
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{product.merk ?? "-"}</p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Tipe
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">{product.tipe ?? "-"}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="border-l-4 border-primary pl-4 font-semibold text-foreground">
              Deskripsi Produk
            </h3>

            <p
              className="text-sm font-medium leading-[180%] text-foreground-600"
              dangerouslySetInnerHTML={{ __html: product.deskripsi }}
            ></p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 z-50 h-24 w-full bg-white">
        <div className="grid h-full grid-cols-2 place-items-center items-center justify-between gap-4">
          <Button
            variant="bordered"
            color="primary"
            startContent={<Plus weight="bold" size={18} />}
            onClick={() => router.push("/cart")}
            className="w-full font-semibold"
          >
            Keranjang
          </Button>

          <PopupPurchaseAmount />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ params }) => {
  const response: SuccessResponse<ProductDetail> = await fetcher({
    url: `/products/${params?.slug}`,
    method: "GET",
  });

  return {
    props: {
      product: response.data,
    },
  };
}) satisfies GetServerSideProps<{ product: ProductDetail }>;
