import { AppContext } from "@/context/AppContext";
import { fetcher } from "@/utils/fetcher";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Minus, Plus } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

export default function PopupPurchaseAmount({
  status,
}: {
  status: "authenticated" | "unauthenticated" | "loading";
}) {
  const router = useRouter();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(1);
  const [quantityValue] = useDebounce(quantity, 500);
  const [disabled, setDisabled] = useState(false);

  const ctx = useContext(AppContext);

  async function handlePlus() {
    try {
      await fetcher({
        url: `/check?kode_item=${params.code}&quantity=${quantityValue + 1}`,
        method: "GET",
      });

      setQuantity(quantityValue + 1);
    } catch (error) {
      console.log(error);
      Toast.error("Terjadi kesalahan saat mengecek stok");
    }
  }

  useEffect(() => {
    if (quantityValue) {
      checkQuantity();
    }

    async function checkQuantity() {
      try {
        await fetcher({
          url: `/check?kode_item=${params.code}&quantity=${quantityValue + 1}`,
          method: "GET",
        });

        setQuantity(quantityValue);
        setDisabled(false);
      } catch (error) {
        console.log(error);
        const err = error as { status_code: number };

        if (err.status_code == 422) {
          setQuantity((prev) => prev);
          setDisabled(true);
          return Toast.error("Input terlalu banyak");
        }

        Toast.error("Terjadi kesalahan saat mengecek stok");
      }
    }
  }, [quantityValue, params]);

  return (
    <>
      <Button
        variant="solid"
        color="primary"
        onClick={() => {
          if (status == "unauthenticated") {
            ctx?.onOpenUnauthenticated();
          } else {
            onOpen();
          }
        }}
        className="w-full font-semibold"
      >
        Beli Sekarang
      </Button>

      <Modal
        isDismissable={false}
        size="sm"
        placement="center"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" />

              <ModalBody>
                <p className="font-medium text-foreground-600">
                  Atur Jumlah Pesanan
                </p>

                <div className="grid grid-cols-[50px_1fr_50px] items-center gap-2">
                  <Button
                    isIconOnly
                    variant="flat"
                    color="primary"
                    isDisabled={!quantity}
                    onClick={() => {
                      if (!quantity) {
                        setQuantity(1);
                      } else {
                        setQuantity((prev) => prev - 1);
                      }
                    }}
                  >
                    <Minus weight="bold" size={18} />
                  </Button>

                  <Input
                    value={`${quantity}`}
                    type="number"
                    labelPlacement="outside"
                    placeholder="Masukan jumlah pesanan..."
                    className="w-full"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />

                  <Button
                    isIconOnly
                    variant="flat"
                    color="primary"
                    onClick={handlePlus}
                    isDisabled={disabled}
                  >
                    <Plus weight="bold" size={18} />
                  </Button>
                </div>
              </ModalBody>

              <ModalFooter className="mt-8">
                <Button
                  variant="light"
                  color="danger"
                  onPress={onClose}
                  className="font-semibold"
                >
                  Batal
                </Button>

                <Button
                  color="primary"
                  onPress={onClose}
                  className="font-semibold"
                  onClick={() =>
                    router.push(
                      `/purchase/checkout?code=${params.code}&quantity=${quantityValue}`,
                    )
                  }
                  isDisabled={disabled || !quantity}
                >
                  Selanjutnya
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
