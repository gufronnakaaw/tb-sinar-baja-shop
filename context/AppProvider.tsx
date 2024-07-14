import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

  useEffect(() => {
    onCloseUnauthenticated();
  }, [router, onCloseUnauthenticated]);

  return (
    <AppContext.Provider
      value={{
        isOpenUnauthenticated,
        onCloseUnauthenticated,
        onOpenUnauthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
