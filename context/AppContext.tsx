import { createContext } from "react";

type AppContextType = {
  isOpenUnauthenticated: boolean;
  onCloseUnauthenticated: () => void;
  onOpenUnauthenticated: () => void;
  totalCarts: number;
  isOpen: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
