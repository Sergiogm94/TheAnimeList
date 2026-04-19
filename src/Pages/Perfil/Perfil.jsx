import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";

export default function Perfil() {
    const { usuario, logout, favoritos, setFavoritos } = useContext(AuthContext);

    // -----------------------------
    // cargar favoritos SOLO si hace falta
    // -----------------------------
    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const res = await axios.get(
                    "http://localhost/TheAnimeList-Backend/obtenerFavoritos.php",
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setFavoritos(res.data.favoritos || []);
                }

            } catch (error) {
                console.error(error);
            }
        };

        if (usuario) {
            fetchFavoritos();
        }
    }, [usuario]);

    // -----------------------------
    // eliminar favorito
    // -----------------------------
    const quitarFavorito = async (id_anime) => {
        try {
            const res = await axios.post(
                "http://localhost/TheAnimeList-Backend/eliminarFavoritos.php",
                { id_anime },
                { withCredentials: true }
            );

            if (res.data.success) {
                setFavoritos(prev =>
                    prev.filter(a => a.id_anime !== id_anime)
                );
            } else {
                alert(res.data.mensaje);
            }

        } catch (error) {
            console.error(error);
        }
    };

    if (!usuario) return <h1>No has iniciado sesión</h1>;

    return (
        <div>
            <Header />
            <Nav />

            <h1>Perfil</h1>
            <p>{usuario}</p>

            <button onClick={logout}>Cerrar sesión</button>

            <h2>Mis favoritos</h2>

            {favoritos.length === 0 ? (
                <p>No tienes favoritos aún</p>
            ) : (
                <div style={{ display: "flex", gap: "15px" }}>
                    {favoritos.map((anime) => (
                        <div key={anime.id_anime}>
                            <p>{anime.titulo}</p>
                            <img src={anime.imagen} width="100" />

                            <button
                                onClick={() => quitarFavorito(anime.id_anime)}
                            >
                                Quitar de favoritos
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );
}