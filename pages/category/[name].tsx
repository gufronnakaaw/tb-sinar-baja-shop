import FilterCategoryProduct from "@/components/FilterCategoryProduct";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/card/CardProduct";
import { GlobalResponse } from "@/types/global.type";
import { ProductTest } from "@/types/product.type";
import { exampleFetcher } from "@/utils/fetcher";
import { Input, Spinner } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

export default function CategoriesPage() {
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

  const { data, setSize, isValidating } = useSWRInfinite(
    getKey,
    exampleFetcher,
    {
      revalidateFirstPage: false,
    },
  );
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
            <FilterCategoryProduct />
          </div>

          <div className="grid grid-cols-2 items-start gap-4 pb-32">
            {produk?.map((product) => (
              <CardProduct
                key={product.id}
                product={{
                  kode_item: `${product.id}`,
                  kategori: product.category,
                  nama_produk: product.title,
                  slug: product.title,
                  image: [{ url: product.image }],
                  harga_4: product.price,
                  harga_1: 0,
                  harga_2: 0,
                  harga_3: 0,
                  harga_5: 0,
                  harga_6: 0,
                  nama_produk_asli: product.title,
                }}
              />
            ))}

            <div ref={ref}></div>

            {isValidating ? (
              <div className="col-span-2 mt-4 justify-self-center px-8 font-semibold">
                <Spinner color="default" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}
