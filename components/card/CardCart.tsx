import { Cart } from "@/types/cart.type";
import { fetcher } from "@/utils/fetcher";
import { formatRupiah } from "@/utils/formatRupiah";
import { Button, Checkbox, Image, Input } from "@nextui-org/react";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import Toast from "react-hot-toast";
import { KeyedMutator } from "swr";
import { useDebounce } from "use-debounce";

type CardCartProps = {
  cart: Cart;
  mutate: KeyedMutator<any>;
  token: string;
};

export default function CardCart({ cart, mutate, token }: CardCartProps) {
  const [input, setInput] = useState(`${cart.qty}`);
  const [inputValue] = useDebounce(input, 1000);

  async function handleCartActive() {
    try {
      await fetcher({
        url: "/carts",
        method: "PATCH",
        token,
        data: {
          cart_id: cart.cart_id,
          value: !cart.active,
        },
      });
      mutate();
    } catch (error) {
      console.log(error);
      Toast.error("Terjadi kesalahan saat update keranjang");
    }
  }

  async function handleDeleteCart(cart_id: string) {
    if (!confirm("apakah anda yakin?")) return;

    try {
      await fetcher({
        url: `/carts/${cart_id}`,
        method: "DELETE",
        token,
      });
      mutate();
    } catch (error) {
      console.log(error);
      Toast.error("Terjadi kesalahan saat hapus keranjang");
    }
  }

  async function handleDecrementCart() {
    try {
      await fetcher({
        url: `/carts/quantity`,
        method: "PATCH",
        token,
        data: {
          cart_id: cart.cart_id,
          kode_item: cart.kode_item,
          type: "decrement",
        },
      });
      mutate();
      setInput((prev) => `${parseInt(prev) - 1}`);
    } catch (error) {
      console.log(error);
      Toast.error("Terjadi kesalahan saat update keranjang");
    }
  }

  async function handleIncrementCart() {
    try {
      await fetcher({
        url: `/carts/quantity`,
        method: "PATCH",
        token,
        data: {
          cart_id: cart.cart_id,
          kode_item: cart.kode_item,
          type: "increment",
        },
      });
      mutate();
      setInput((prev) => `${parseInt(prev) + 1}`);
    } catch (error) {
      console.log(error);
      const err = error as { status_code: number };

      if (err.status_code == 422) {
        return Toast.error("Terlalu banyak input");
      }
      Toast.error("Terjadi kesalahan saat update keranjang");
    }
  }

  useEffect(() => {
    if (inputValue) {
      if (parseInt(inputValue)) {
        if (parseInt(inputValue) != cart.qty) {
          handleInputCart();
        }
      }
    }

    async function handleInputCart() {
      try {
        await fetcher({
          url: `/carts/quantity`,
          method: "PATCH",
          token,
          data: {
            cart_id: cart.cart_id,
            kode_item: cart.kode_item,
            type: "input",
            qty: parseFloat(inputValue),
          },
        });

        mutate();
      } catch (error) {
        console.log(error);
        const err = error as { status_code: number };

        if (err.status_code == 422) {
          setInput(`${cart.qty}`);
          return Toast.error("Input terlalu banyak");
        }
        Toast.error("Terjadi kesalahan saat update keranjang");
      }
    }
  }, [inputValue]);

  return (
    <div className="flex">
      <Checkbox
        size="lg"
        color="primary"
        classNames={{
          base: "gap-2",
        }}
        isSelected={cart.active}
        onValueChange={handleCartActive}
      ></Checkbox>

      <div className="grid grid-cols-[120px_1fr] items-center gap-4">
        <Image
          priority
          as={NextImage}
          src={`${!cart.image.length ? "/img/product-image-test.jpg" : cart.image[0].url}`}
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

          <div className="grid grid-cols-2 items-center justify-between gap-2">
            <div className="grid grid-cols-[32px_50px_32px] items-center gap-2">
              <Button
                isIconOnly
                variant="bordered"
                color="default"
                size="sm"
                isDisabled={cart.qty <= 1}
                onClick={() => {
                  setTimeout(() => {
                    handleDecrementCart();
                  }, 1000);
                }}
              >
                <Minus weight="bold" size={20} />
              </Button>

              <Input
                type="number"
                variant="flat"
                color="default"
                size="sm"
                labelPlacement="outside"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <Button
                isIconOnly
                variant="bordered"
                color="default"
                size="sm"
                onClick={() => {
                  setTimeout(() => {
                    handleIncrementCart();
                  }, 1000);
                }}
              >
                <Plus weight="bold" size={20} />
              </Button>
            </div>

            <Button
              isIconOnly
              variant="flat"
              color="danger"
              size="sm"
              onClick={() => handleDeleteCart(cart.cart_id)}
              className="justify-self-end"
            >
              <Trash weight="duotone" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
