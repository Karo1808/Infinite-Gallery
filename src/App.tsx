import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ImageDetails from "./pages/ImageDetails";
import RootLocationContextProvider from "./context/root-location-context";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <QueryClientProvider client={queryClient}>
      <RootLocationContextProvider>
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
        </Routes>
        {background && (
          <Routes>
            <Route path="/image/:id" element={<ImageDetails />} />
          </Routes>
        )}
      </RootLocationContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
