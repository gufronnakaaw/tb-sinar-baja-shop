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
import { UploadSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Toast from "react-hot-toast";

export default function PopupPaymentConfirm({
  token,
  transaksi_id,
}: {
  token: string;
  transaksi_id: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [nama, setNama] = useState("");
  const [dari, setDari] = useState("");

  async function handleUpload() {
    const form = new FormData();
    form.append("payment", file as Blob);
    form.append("transaksi_id", transaksi_id);
    form.append("nama", nama);
    form.append("dari", dari);
    try {
      await fetcher({
        url: "/payments",
        method: "POST",
        token,
        data: form,
        file: true,
      });

      router.push(
        `/profile/transactions/detail?id=${encodeURIComponent(transaksi_id)}`,
      );
    } catch (error) {
      console.log(error);

      Toast.error("Terjadi kesalahan saat update transaksi");
    }
  }

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
                    onChange={(e) => setNama(e.target.value)}
                  />

                  <Input
                    isRequired
                    variant="flat"
                    color="default"
                    label="Bank"
                    labelPlacement="outside"
                    placeholder="Contoh: Bank Satu Nusa"
                    onChange={(e) => setDari(e.target.value)}
                  />

                  <div className="grid gap-1.5">
                    <span className="inline-flex text-sm after:ml-[2px] after:text-danger after:content-['*']">
                      Cari Berkas
                    </span>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.jpg,.jpeg,.png,.svg,.pdf"
                      className="rounded-xl bg-default-100 px-2 py-2 text-small text-foreground-500 file:mr-4 file:rounded-md file:border-0 file:bg-default-200 file:px-2 file:py-[2px] file:text-sm file:font-medium file:text-primary hover:file:bg-default-300"
                      onChange={(e) => {
                        if (!e.target.files) return;

                        setFile(e.target.files[0]);
                      }}
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
                  isDisabled={!nama || !dari || !file}
                  onClick={handleUpload}
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
