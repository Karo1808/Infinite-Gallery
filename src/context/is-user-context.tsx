import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type IsUserContextType = {
  isUser: boolean;
  setIsUser: Dispatch<SetStateAction<boolean>>;
};

export const IsUserContext = createContext<IsUserContextType | null>(null);

const IsUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isUser, setIsUser] = useState<boolean>(false);

  return (
    <IsUserContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </IsUserContext.Provider>
  );
};

export default IsUserContextProvider;

export const useIsUserContext = () => {
  const context = useContext(IsUserContext);
  if (!context) {
    throw new Error(
      "useIsUserContext must be used within an IsUserContextProvider"
    );
  }
  return context;
};
