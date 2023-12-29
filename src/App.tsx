import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ImageDetails from "./pages/ImageDetails";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <QueryClientProvider client={queryClient}>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Home />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/image/:id" element={<ImageDetails />} />
        </Routes>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
