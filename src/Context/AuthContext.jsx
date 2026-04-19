import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    const [favoritos, setFavoritos] = useState([]);

    // -----------------------------
    // 🔐 comprobar sesión
    // -----------------------------
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
                setUsuario(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // -----------------------------
    // ⭐ cargar favoritos cuando hay usuario
    // -----------------------------
    useEffect(() => {
        const cargarFavoritos = async () => {
            if (!usuario) {
                setFavoritos([]);
                return;
            }

            try {
                const res = await axios.get(
                    "http://localhost/TheAnimeList-Backend/obtenerFavoritos.php",
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setFavoritos(res.data.favoritos || []);
                }

            } catch (error) {
                console.log(error);
            }
        };

        cargarFavoritos();
    }, [usuario]);

    // -----------------------------
    // login
    // -----------------------------
    const login = (userData) => {
        setUsuario(userData);
    };

    // -----------------------------
    // logout
    // -----------------------------
    const logout = async () => {
        await axios.get(
            "http://localhost/TheAnimeList-Backend/logout.php",
            { withCredentials: true }
        );

        setUsuario(null);
        setFavoritos([]);
    };

    return (
        <AuthContext.Provider value={{
            usuario,
            login,
            logout,
            loading,
            favoritos,
            setFavoritos
        }}>
            {children}
        </AuthContext.Provider>
    );
}