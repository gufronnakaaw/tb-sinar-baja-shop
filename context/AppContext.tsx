import { createContext } from "react";

type AppContextType = {
  isOpenUnauthenticated: boolean;
  onCloseUnauthenticated: () => void;
  onOpenUnauthenticated: () => void;
  totalCarts: number;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
