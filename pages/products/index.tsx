import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/card/CardProduct";
import { GlobalResponse } from "@/types/global.type";
import { ProductTest } from "@/types/product.type";
import { clientFetcher } from "@/utils/fetcher";
import { filtering, sorting } from "@/utils/filterDataMap";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Funnel, MagnifyingGlass, SortAscending } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

export default function ProductsPage() {
  const getKey = (
    pageIndex: number,
    previousPageData: GlobalResponse<ProductTest[]>,
  ) => {
    if (previousPageData && !previousPageData.products.length) return null;

    if (pageIndex == 0)
      return {
        url: `/products?page=${1}&limit=8`,
        method: "GET",
      };

    return {
      url: `/products?page=${pageIndex + 1}&limit=8`,
      method: "GET",
    };
  };

  const { data, setSize, isValidating } = useSWRInfinite<
    GlobalResponse<ProductTest[]>
  >(getKey, clientFetcher);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setSize((prev) => prev + 1);
    }
  }, [inView, setSize]);

  const produk = data?.map((item) => item.products.flat()).flat();

  return (
    <Layout title="Jelajahi Pilihan Baja Berkualitas Tinggi Untuk Semua Kebutuhan Anda.">
      <Navbar />

      <div className="grid gap-4">
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
            placeholder="Cari produk disini"
          />
        </header>

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Semua Produk</h4>

          <div className="grid grid-cols-2 items-center gap-4">
            <Select
              aria-label="sorting"
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Urutkan"
              startContent={<SortAscending weight="bold" size={18} />}
              items={sorting}
              classNames={{
                value: "font-medium text-foreground",
              }}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>

            <Select
              aria-label="filtering"
              variant="flat"
              color="default"
              labelPlacement="outside"
              placeholder="Semua"
              startContent={<Funnel weight="bold" size={18} />}
              items={filtering}
              classNames={{
                value: "font-medium text-foreground",
              }}
            >
              {(item) => (
                <SelectItem key={item.id_category}>{item.name}</SelectItem>
              )}
            </Select>
          </div>

          <div className="grid grid-cols-2 items-start gap-4 pb-32">
            {produk?.map((product) => (
              <CardProduct
                key={product.id}
                product={{
                  price: product.price,
                  product_category: product.category,
                  product_id: product.id,
                  product_image: product.image,
                  product_name: product.title,
                }}
              />
            ))}

            {isValidating ? (
              <p className="col-span-2 mt-4 justify-self-center px-8 font-semibold">
                Loading...
              </p>
            ) : null}
          </div>

          <div ref={ref}></div>
        </div>
      </div>
    </Layout>
  );
}
