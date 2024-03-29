import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const ImageDetailsModal = lazy(() => import("./pages/ImageDetailsModal"));
const ImageDetails = lazy(() => import("./pages/ImageDetails"));
import RootLocationContextProvider from "./context/root-location-context";
import IsUserContextProvider from "./context/is-user-context";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <QueryClientProvider client={queryClient}>
      <RootLocationContextProvider>
        <IsUserContextProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {/* todo Improve suspense loading state */}
            <Routes location={background || location}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/image/:id" element={<ImageDetails />} />
              </Route>
            </Routes>
            {background && (
              <Routes>
                <Route path="/image/:id" element={<ImageDetailsModal />} />
              </Routes>
            )}
          </Suspense>
        </IsUserContextProvider>
      </RootLocationContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
