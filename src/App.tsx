import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const ImageDetails = lazy(() => import("./pages/ImageDetails"));
import RootLocationContextProvider from "./context/root-location-context";

export const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <QueryClientProvider client={queryClient}>
      <RootLocationContextProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {/* todo Improve suspense loading state */}
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
          </Routes>
          {background && (
            <Routes>
              <Route path="/image/:id" element={<ImageDetails />} />
            </Routes>
          )}
        </Suspense>
      </RootLocationContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
