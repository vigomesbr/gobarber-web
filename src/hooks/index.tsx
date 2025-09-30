import { type ReactNode } from "react";
import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
    return(
        <AuthProvider>
            <ToastProvider>{ children }</ToastProvider>
        </AuthProvider>
    )

}

export default AppProvider;