import Layout from "@/components/Layout";
import HeaderTitle from "@/components/header/HeaderTitle";
import { Button } from "@nextui-org/react";
import { Plus, Tag } from "@phosphor-icons/react";
import Image from "next/image";

export default function DetailsPage() {
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
            priority
            src="/img/dummy-product.jpeg"
            alt="product img"
            width={1000}
            height={1000}
            className="mb-2 aspect-square h-auto w-full rounded-xl"
          />

          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-bold text-primary">Rp 18.216</h3>
            <p className="inline-flex items-center text-sm font-medium text-foreground-600">
              <Tag weight="fill" size={16} className="mr-2 text-amber-500" />
              54 terjual
            </p>
          </div>

          <div className="mb-2">
            <h4 className="text-[20px] font-semibold text-foreground">
              Rak Gondola Double Hook 30
            </h4>
            <p className="text-sm font-medium text-foreground-500">
              Rak - Rak Gondola Double Hook
            </p>
          </div>

          <div className="mb-4 grid gap-2">
            <h3 className="border-l-4 border-primary pl-4 text-[18px] font-semibold text-foreground">
              Detail Produk
            </h3>

            <div className="grid gap-1">
              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Kategori
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">
                  Rak - Rak Gondola Double Hook
                </p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Berat
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">2kg</p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Volume
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">-</p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Satuan
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">bj</p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Merk
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">-</p>
              </div>

              <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm text-default-900">
                <div className="text-sm font-medium capitalize text-default-600">
                  Tipe
                </div>
                <div className="font-medium">:</div>
                <p className="font-bold text-primary">-</p>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <h3 className="border-l-4 border-primary pl-4 text-[18px] font-semibold text-foreground">
              Deskripsi Produk
            </h3>

            <p className="text-sm font-medium leading-[180%] text-foreground-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              omnis. Perferendis provident doloribus sint sunt inventore nostrum
              non. Temporibus ipsum labore eligendi accusamus distinctio
              similique doloremque quisquam, quo excepturi nobis.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 z-50 h-24 w-full bg-white">
        <div className="grid h-full grid-cols-2 place-items-center items-center justify-between gap-4">
          <Button
            variant="bordered"
            color="primary"
            startContent={<Plus weight="bold" size={18} />}
            className="w-full font-semibold"
          >
            Keranjang
          </Button>

          <Button
            variant="solid"
            color="primary"
            className="w-full font-semibold"
          >
            Beli Sekarang
          </Button>
        </div>
      </div>
    </Layout>
  );
}
