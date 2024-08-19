import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const usuarioStorage = localStorage.getItem('@viagem365:user');
        return usuarioStorage ? JSON.parse(usuarioStorage) : null;
    });

    async function signIn({ email, password }) {
        // Exemplo de requisição de login
        const response = await fetch(`http://localhost:3333/users?email=${email}&password=${password}`);
        const data = await response.json();

        if (data.length > 0) {
            const usuario = data[0];
            setUser(usuario);
            localStorage.setItem('@viagem365:user', JSON.stringify(usuario));
            return true;
        } else {
            return false;
        }
    }

    const isAuthenticated = !!user; // Se user estiver definido, o usuário está autenticado

    return (
        <AuthContext.Provider value={{ user, signIn, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}