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
import { UploadSimple } from "@phosphor-icons/react";

export default function PopupPaymentConfirm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="bordered"
        color="primary"
        onPress={onOpen}
        className="w-full font-semibold"
      >
        Konfirmasi Pembayaran
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-semibold text-default-900">
                Bukti Pembayaran
              </ModalHeader>

              <ModalBody>
                <div className="grid gap-4">
                  <Input
                    isRequired
                    variant="flat"
                    color="default"
                    label="Nama Pengirim"
                    labelPlacement="outside"
                    placeholder="Contoh: Jhon Doe"
                  />

                  <Input
                    isRequired
                    variant="flat"
                    color="default"
                    label="Bank"
                    labelPlacement="outside"
                    placeholder="Contoh: Bank Satu Nusa"
                  />

                  <div className="grid gap-1.5">
                    <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                      Cari Berkas
                    </span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.jpg,.jpeg,.png,.svg,.pdf"
                      className="rounded-xl bg-default-100 px-2 py-2 text-small text-foreground-500 file:mr-4 file:rounded-md file:border-0 file:bg-default-200 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-primary hover:file:bg-default-300"
                    />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  Batal
                </Button>

                <Button
                  color="primary"
                  variant="solid"
                  startContent={<UploadSimple weight="bold" size={18} />}
                  className="font-medium"
                >
                  Konfirmasi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
