import { products } from "@/_dummy/products";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import CardProduct from "@/components/card/CardProduct";
import { filtering, sorting } from "@/utils/filterDataMap";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Funnel, MagnifyingGlass, SortAscending } from "@phosphor-icons/react";

export default function ProductsPage() {
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
            placeholder="Cara produk disini"
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
            {products.map((product) => (
              <CardProduct key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
