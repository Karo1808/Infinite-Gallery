import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const ImageDetailsModal = lazy(() => import("./pages/ImageDetailsModal"));
const ImageDetails = lazy(() => import("./pages/ImageDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="page-status">Loading gallery...</div>}>
        <div aria-hidden={background ? true : undefined}>
          <Routes location={background || location}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/image/:id" element={<ImageDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
        {background && (
          <Routes>
            <Route path="/image/:id" element={<ImageDetailsModal />} />
          </Routes>
        )}
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
