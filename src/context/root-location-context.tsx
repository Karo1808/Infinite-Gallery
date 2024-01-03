import { ReactNode, createContext, useContext, useState } from "react";
import { Location } from "react-router-dom";
type RootLocationContext = {
  rootLocation: null | Location;
  setRootLocation: React.Dispatch<React.SetStateAction<Location | null>>;
};

export const RootLocationContext = createContext<RootLocationContext | null>(
  null
);

const RootLocationContextProvider = ({ children }: { children: ReactNode }) => {
  const [rootLocation, setRootLocation] = useState<null | Location>(null);

  return (
    <RootLocationContext.Provider value={{ rootLocation, setRootLocation }}>
      {children}
    </RootLocationContext.Provider>
  );
};
export default RootLocationContextProvider;

export const useRootLocationContext = () => {
  const context = useContext(RootLocationContext);
  if (!context)
    throw new Error(
      "useRootLocationContext must be used within a RootLocationContextProvider"
    );
  return context;
};
