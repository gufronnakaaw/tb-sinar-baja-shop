import Layout from "@/components/Layout";
import PopupPurchaseAmount from "@/components/popup/PopupPurchaseAmount";
import { AppContext } from "@/context/AppContext";
import { SuccessResponse } from "@/types/global.type";
import { ProductDetail } from "@/types/product.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Image } from "@nextui-org/react";
import { CaretLeft, Plus, Tag } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import Toast from "react-hot-toast";

export default function DetailsPage({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const ctx = useContext(AppContext);
  const router = useRouter();

  async function handleCreateCart() {
    try {
      await fetcher({
        url: "/carts",
        method: "POST",
        token: session.data?.user.access_token,
        data: {
          kode_item: product.kode_item,
          qty: 1,
        },
      });

      Toast.success("Berhasil menambahkan produk");
    } catch (error) {
      console.log(error);
      Toast.error("Terjadi kesalahan saat menambahkan keranjang");
    }
  }

  return (
    <Layout title={product.nama_produk_asli}>
      <div className="relative">
        <header className="sticky left-0 top-0 z-50 grid h-20 grid-cols-[50px_1fr_50px] items-center bg-white">
          <Button
            isIconOnly
            variant="light"
            color="default"
            size="sm"
            onClick={() => router.back()}
          >
            <CaretLeft weight="bold" size={20} className="text-foreground" />
          </Button>

          <h5 className="text-center font-semibold text-foreground">
            Detail Produk
          </h5>
        </header>

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
            <h3 className="text-[18px] font-bold text-primary">
              {formatRupiah(product.harga_6)}
            </h3>
            <p className="inline-flex items-center text-sm font-medium text-foreground-600">
              <Tag weight="fill" size={16} className="mr-2 text-amber-500" />
              {product.terjual} terjual
            </p>
          </div>

          <div className="grid gap-[2px] border-b-2 border-dashed border-foreground-200 pb-4">
            <h3 className="text-[18px] font-semibold text-foreground">
              {product.nama_produk_asli}
            </h3>
            <p className="text-sm text-foreground-600">{product.kategori}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              Detail Produk
            </h3>

            <div className="grid gap-1">
              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-[12px] font-medium capitalize text-default-600">
                  Berat
                </div>
                <div className="font-medium">:</div>
                <p className="text-[12px] font-bold text-primary">
                  {product.berat ?? "-"}
                </p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-[12px] font-medium capitalize text-default-600">
                  Volume
                </div>
                <div className="font-medium">:</div>
                <p className="text-[12px] font-bold text-primary">
                  {product.volume ?? "-"}
                </p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-[12px] font-medium capitalize text-default-600">
                  Satuan
                </div>
                <div className="font-medium">:</div>
                <p className="text-[12px] font-bold text-primary">
                  {product.satuan_kecil ?? "-"}
                </p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-[12px] font-medium capitalize text-default-600">
                  Merk
                </div>
                <div className="font-medium">:</div>
                <p className="text-[12px] font-bold text-primary">
                  {product.merk ?? "-"}
                </p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-[12px] font-medium capitalize text-default-600">
                  Tipe
                </div>
                <div className="font-medium">:</div>
                <p className="text-[12px] font-bold text-primary">
                  {product.tipe ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              Deskripsi Produk
            </h3>

            {!product.deskripsi ? (
              <p className="text-[12px] font-medium italic text-foreground-400">
                ----- Tidak ada deskripsi produk! -----
              </p>
            ) : (
              <p
                className="list-inside text-sm font-medium leading-[180%] text-foreground-600"
                dangerouslySetInnerHTML={{ __html: product.deskripsi }}
              ></p>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 z-50 h-24 w-full bg-white">
        <div className="grid h-full grid-cols-2 place-items-center items-center justify-between gap-4">
          <Button
            variant="bordered"
            color="primary"
            startContent={<Plus weight="bold" size={18} />}
            onClick={() => {
              if (session.status == "unauthenticated") {
                ctx?.onOpenUnauthenticated();
              } else {
                handleCreateCart();
              }
            }}
            className="w-full font-semibold"
          >
            Keranjang
          </Button>

          <PopupPurchaseAmount status={session.status} />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = (async ({ params }) => {
  const response: SuccessResponse<ProductDetail> = await fetcher({
    url: `/products/detail/${encodeURIComponent(params?.code as string)}`,
    method: "GET",
  });

  return {
    props: {
      product: response.data,
    },
  };
}) satisfies GetServerSideProps<{ product: ProductDetail }>;
