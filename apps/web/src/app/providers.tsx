import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "sonner"
import { AuthProvider } from "@/features/auth/AuthProvider";

import { queryClient } from "./query-clients"

type ProviderProps = {
    children: React.ReactNode
}

export function Providers({ children }: ProviderProps){
    return(
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
            {children}
        </AuthProvider>

        <Toaster richColors position="top-right" />

        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}