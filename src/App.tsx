
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import MyFarms from "./pages/MyFarms";
import Resources from "./pages/Resources";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./contexts/LanguageContext";
import { UserProvider } from "./contexts/UserContext";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <Router>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="my-farms" element={<MyFarms />} />
                <Route path="resources/*" element={<Resources />} />
                <Route path="marketplace/*" element={<Marketplace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
