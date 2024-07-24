import { StatusBar } from "expo-status-bar";
import BrandScreen from "./brand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Index() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <BrandScreen />
    </QueryClientProvider>
  );
}
