import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/router";

export default function PopupUnauthenticated({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          exit: {
            y: 0,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          },
        },
      }}
      className="rounded-lg"
    >
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col items-center gap-2 py-8">
            <p className="font-semibold text-foreground">Peringatan</p>
            <div className="rounded-full bg-gray-100 p-6">
              <Image
                priority
                as={NextImage}
                src="/img/secure-login-img.svg"
                alt="empty box img"
                width={150}
                height={150}
              />
            </div>

            <div className="grid justify-items-center gap-4">
              <div className="text-center">
                <h4 className="mx-auto mb-1 max-w-[230px] font-semibold text-foreground">
                  Eittss, kamu belum login nih
                </h4>
                <p className="mx-auto max-w-[280px] text-[12px] font-medium text-foreground-600">
                  Silahkan login atau registrasi terlebih dahulu sebelum
                  berbelanja.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="flat"
                  color="primary"
                  className="font-semibold"
                  onClick={() => router.push("/auth/register")}
                >
                  Register
                </Button>

                <Button
                  variant="solid"
                  color="primary"
                  className="font-semibold"
                  onClick={() => router.push("/auth/login")}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
