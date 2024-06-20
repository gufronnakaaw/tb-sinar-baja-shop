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

export default function PopupPurchaseAmount() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="solid"
        color="primary"
        onPress={onOpen}
        className="w-full font-semibold"
      >
        Beli Sekarang
      </Button>

      <Modal isDismissable={false} size="sm" isOpen={isOpen} onClose={onClose}>
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
                    (window.location.href =
                      "/checkout?id=17630837&purchase_amount=2")
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
