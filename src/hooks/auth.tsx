import { createContext, useCallback, useState, type ReactNode, useContext } from "react";
import api from "../services/apiClient";

interface User {
    id: string;
    name: string;
    avatar_url: string;
}

interface SignInCreadentials {
    email: string;
    password: string
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCreadentials): Promise<void>;
    signOut(): void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider = ({ children }: AuthProviderProps) => {
    
    const [data, setData] = useState(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user ) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return {token, user: JSON.parse(user)};
        } 
        
        return {};
    });

    const signIn = useCallback(async ({ email, password }: SignInCreadentials) => {
        const response = await api.post('sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;
        
        setData({ token, user })

    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({});
  
    },[])
    
    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}