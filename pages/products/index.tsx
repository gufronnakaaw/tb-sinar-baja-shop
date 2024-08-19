import CardProduct from "@/components/card/CardProduct";
import FilterProduct from "@/components/FilterProduct";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { SuccessResponse } from "@/types/global.type";
import { Product } from "@/types/product.type";
import { fetcher } from "@/utils/fetcher";
import { Input, Spinner } from "@nextui-org/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { useDebounce } from "use-debounce";

export default function ProductsPage({
  products,
  sort,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 1000);

  const getKey = (
    pageIndex: number,
    previousPageData: SuccessResponse<Product[]>,
  ) => {
    if (previousPageData && !previousPageData.data.length) return null;

    return {
      url: sort
        ? `/products?page=${pageIndex + 1}&sort=${sort}`
        : `/products?page=${pageIndex + 1}`,
      method: "GET",
    };
  };

  const { data, setSize, isValidating } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setSize((prev) => prev + 1);
    }
  }, [inView, setSize]);

  useEffect(() => {
    if (searchValue) {
      router.push(`/products/search?q=${encodeURIComponent(searchValue)}`);
    }
  }, [searchValue]);

  const productsMap: Product[] = !data
    ? products.data
    : data?.map((item) => item.data.flat()).flat();

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
            onChange={(e) => {
              if (e.target.value) {
                setSearch(e.target.value);
              }
            }}
            autoComplete="off"
          />
        </header>

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">Semua Produk</h4>

          <div className="grid grid-cols-2 items-center gap-4">
            <FilterProduct />
          </div>

          <div className="grid grid-cols-2 items-start gap-4 pb-32">
            {productsMap?.map((product) => (
              <CardProduct key={product.kode_item} product={product} />
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

export const getServerSideProps = (async ({ query }) => {
  const sort = query?.sort as string;
  const response: SuccessResponse<Product[]> = await fetcher({
    url: sort ? `/products?page=1&sort=${sort}` : "/products?page=1",
    method: "GET",
  });

  return {
    props: {
      products: response,
      sort: sort ? sort : "",
    },
  };
}) satisfies GetServerSideProps<{
  products: SuccessResponse<Product[]>;
  sort: string;
}>;
