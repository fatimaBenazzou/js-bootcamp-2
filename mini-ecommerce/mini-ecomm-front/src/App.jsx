import { Provider } from "react-redux";
import AppRoutes from "./Routes";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AppRoutes />
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
