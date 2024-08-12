import { Cart } from "@/types/cart.type";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Checkbox, Image, Input } from "@nextui-org/react";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import NextImage from "next/image";

export default function CardCart(cart: Cart) {
  return (
    <Checkbox
      size="lg"
      color="primary"
      classNames={{
        base: "gap-2",
      }}
      isSelected={cart.active}
    >
      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <Image
          priority
          as={NextImage}
          src={cart.image[0].url}
          alt="image"
          width={1000}
          height={1000}
          className="aspect-square h-auto w-[120px] rounded-lg"
        />

        <div className="flex h-full flex-col justify-between">
          <div>
            <h4 className="line-clamp-1 text-sm font-semibold text-foreground">
              {cart.nama_produk_asli}
            </h4>
            <p className="text-[12px] font-medium text-foreground-600">
              {cart.kategori}
            </p>
            <h4 className="mt-2 text-sm font-semibold text-foreground">
              {formatRupiah(cart.harga_6)}
            </h4>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="grid grid-cols-[32px_64px_32px] items-center gap-2">
              <Button isIconOnly variant="bordered" color="default" size="sm">
                <Minus weight="bold" size={20} />
              </Button>

              <Input
                type="number"
                inputMode="numeric"
                variant="flat"
                color="default"
                size="sm"
                labelPlacement="outside"
                placeholder="Jumlah"
                value={`${cart.qty}`}
              />

              <Button isIconOnly variant="bordered" color="default" size="sm">
                <Plus weight="bold" size={20} />
              </Button>
            </div>

            <Button isIconOnly variant="flat" color="danger" size="sm">
              <Trash weight="duotone" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </Checkbox>
  );
}
