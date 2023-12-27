import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Gallery from "./components/Gallery";
import { RiInfinityLine } from "react-icons/ri";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <header className="header">
        <RiInfinityLine size={50} />
        <span className="title">Gallery</span>
      </header>
      <main>
        <Gallery />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
