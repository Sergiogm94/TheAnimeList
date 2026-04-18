import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // Comprobar la sesion al cargar la app
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(
                    "http://localhost/TheAnimeList-Backend/perfil.php",
                    { withCredentials: true }
                );

                if (res.data.logged) {
                    setUsuario(res.data.usuario);
                } else {
                    setUsuario(null);
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData) => {
        setUsuario(userData);
    };

    const logout = async () => {
        await axios.get(
            "http://localhost/TheAnimeList-Backend/logout.php",
            { withCredentials: true }
        );
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}