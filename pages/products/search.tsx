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
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { useDebounce } from "use-debounce";

export default function ProductsSearchPage({
  products,
  q,
  sort,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useState(q);
  const [searchValue] = useDebounce(search, 1000);

  const router = useRouter();
  const containerParent = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  const getKey = (
    pageIndex: number,
    previousPageData: SuccessResponse<Product[]>,
  ) => {
    if (previousPageData && !previousPageData.data.length) return null;

    return {
      url: sort
        ? `/products/search?q=${encodeURIComponent(q)}&page=${pageIndex + 1}&sort=${sort}`
        : `/products/search?q=${encodeURIComponent(q)}&page=${pageIndex + 1}`,
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
      containerParent.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
      inputElement.current?.focus();

      router.push(`/products/search?q=${encodeURIComponent(searchValue)}`);
    } else {
      router.push("/products");
    }
  }, [searchValue]);

  const productsMap: Product[] = !data
    ? products.data
    : data?.map((item) => item.data.flat()).flat();

  return (
    <Layout title="Jelajahi Pilihan Baja Berkualitas Tinggi Untuk Semua Kebutuhan Anda.">
      <div className="grid gap-4" ref={containerParent}>
        <header className="sticky left-0 top-0 z-50 flex h-20 items-center gap-4 bg-white">
          <Input
            defaultValue={q}
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
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            ref={inputElement}
          />
        </header>

        <div className="grid gap-4">
          <h4 className="font-semibold text-foreground">
            Semua Produk {q ? `“${q}”` : null}
          </h4>

          <div className="grid grid-cols-2 items-center gap-4">
            <FilterProduct />
          </div>

          <div className="min-h-screen">
            <div className="grid grid-cols-2 items-start gap-4 pb-8">
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
      </div>

      <Navbar />
    </Layout>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const q = query?.q as string;
  const sort = query?.sort as string;

  const response: SuccessResponse<Product[]> = await fetcher({
    url: sort
      ? `/products/search?q=${encodeURIComponent(q)}&page=1&sort=${sort}`
      : `/products/search?q=${encodeURIComponent(q)}&page=1`,
    method: "GET",
  });

  return {
    props: {
      products: response,
      q,
      sort: sort ? sort : "",
    },
  };
}) satisfies GetServerSideProps<{
  products: SuccessResponse<Product[]>;
  q: string;
  sort: string;
}>;
