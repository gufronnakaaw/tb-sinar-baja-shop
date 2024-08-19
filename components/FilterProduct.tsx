import { Category } from "@/types/category.type";
import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
import { sorting } from "@/utils/filterDataMap";
import { Select, SelectItem } from "@nextui-org/react";
import { Funnel, SortAscending } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function FilterProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();

    async function getCategories() {
      try {
        const response: SuccessResponse<Category[]> = await fetcher({
          url: "/categories",
          method: "GET",
        });

        setCategories(response.data);
      } catch (error) {
        alert("cannot get categories");
        console.log(error);
      }
    }
  }, []);

  function handleSorting(e: ChangeEvent<HTMLSelectElement>) {
    const sort = e.target.value;

    if (!sort) {
      delete router.query.sort;

      return router.push({
        query: { ...router.query },
      });
    }

    return router.push({
      query: { ...router.query, sort },
    });
  }

  function handleCategories(e: ChangeEvent<HTMLSelectElement>) {
    const category = e.target.value;

    if (category) {
      const find = categories.find((item) => item.id == parseInt(category));

      return router.push(
        `/category/${encodeURIComponent(find?.nama as string)}`,
      );
    }

    return router.push("/products");
  }

  return (
    <>
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
        onChange={handleSorting}
        selectedKeys={[router.query.sort as string]}
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
        items={categories}
        classNames={{
          value: "font-medium text-foreground",
        }}
        onChange={handleCategories}
      >
        {(item) => <SelectItem key={item.id}>{item.nama}</SelectItem>}
      </Select>
    </>
  );
}
