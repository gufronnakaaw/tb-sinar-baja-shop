import { SuccessResponse } from "@/types/global.type";
import { fetcher } from "@/utils/fetcher";
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

  return (
    <AppContext.Provider
      value={{
        isOpenUnauthenticated,
        onCloseUnauthenticated,
        onOpenUnauthenticated,
        totalCarts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
