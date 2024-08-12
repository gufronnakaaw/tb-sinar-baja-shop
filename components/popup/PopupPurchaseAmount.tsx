import { AppContext } from "@/context/AppContext";
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
import { useContext } from "react";

export default function PopupPurchaseAmount({
  status,
}: {
  status: "authenticated" | "unauthenticated" | "loading";
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ctx = useContext(AppContext);

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
                  <Button isIconOnly variant="bordered" color="primary">
                    <Minus weight="bold" size={18} />
                  </Button>

                  <Input
                    type="number"
                    labelPlacement="outside"
                    placeholder="Masukan jumlah pesanan..."
                    defaultValue="1"
                    className="w-full"
                  />

                  <Button isIconOnly variant="bordered" color="primary">
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
                    (window.location.href = "/purchase/checkout?id=17630837")
                  }
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
