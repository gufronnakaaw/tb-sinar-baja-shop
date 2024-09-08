import { SuccessResponse } from "@/types/global.type";
import { OperationalType } from "@/types/operational.type";
import { fetcher } from "@/utils/fetcher";
import { days } from "@/utils/formatDate";
import { useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Toast from "react-hot-toast";
import { AppContext } from "./AppContext";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isOpen: isOpenUnauthenticated,
    onClose: onCloseUnauthenticated,
    onOpen: onOpenUnauthenticated,
  } = useDisclosure();
  const router = useRouter();
  const session = useSession();
  const [totalCarts, setTotalCarts] = useState(0);
  const [operational, setOperational] = useState<OperationalType[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    getOperational();

    async function getOperational() {
      try {
        const result: SuccessResponse<OperationalType[]> = await fetcher({
          url: "/operational",
          method: "GET",
        });

        setOperational(result.data);
      } catch (error) {
        Toast.error("Terjadi kesalahan saat mendapatkan jam operasional");
        console.log(error);
      }
    }
  }, [router]);

  useEffect(() => {
    onCloseUnauthenticated();
  }, [router, onCloseUnauthenticated]);

  useEffect(() => {
    if (session.status == "authenticated") {
      getTotalCarts();
    }

    async function getTotalCarts() {
      try {
        const response: SuccessResponse<{ cart_id: string }[]> = await fetcher({
          url: "/carts",
          method: "GET",
          token: session.data?.user.access_token,
        });

        setTotalCarts(response.data.length);
      } catch (error) {
        console.log(error);
        Toast.error("Terjadi kesalahan saat mendapatkan total cart");
      }
    }
  }, [router, session]);

  useEffect(() => {
    if (router.pathname.startsWith("/purchase") || router.pathname == "/") {
      const now = new Date();
      const hour = now.getHours();
      const day = days[now.getDay()];

      const find = operational.find((el) => el.hari == day);

      const open = find?.open.split(":")[0];
      const close = find?.close.split(":")[0];

      if (open == "-" && close == "-") {
        setIsOpen(false);
      } else if (
        hour >= parseInt(open as string) &&
        hour <= parseInt(close as string)
      ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [router, operational]);

  useEffect(() => {
    if (router.pathname.startsWith("/purchase")) {
      if (!isOpen) {
        router.push("/offline");
      }
    }
  }, [router, isOpen]);

  return (
    <AppContext.Provider
      value={{
        isOpenUnauthenticated,
        onCloseUnauthenticated,
        onOpenUnauthenticated,
        totalCarts,
        isOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
