import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./perfil.css";

export default function Perfil() {
    const { usuario, logout, favoritos, setFavoritos } = useContext(AuthContext);
    const navigate = useNavigate();

   // Función para cargar los favoritos.
    useEffect(() => {
        const fetchFavoritos = async () => {
            try {
                const res = await axios.get(
                    "http://the-anime-list-backend.rf.gd/obtenerFavoritos.php",
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

    // Funcion para eliminar los favoritos.
    const quitarFavorito = async (id_anime) => {
        try {
            const res = await axios.post(
                "http://the-anime-list-backend.rf.gd/eliminarFavoritos.php",
                { id_anime },
                { withCredentials: true }
            );

            if (res.data.success) {
                setFavoritos(prev =>
                    prev.filter(a => a.id_anime !== id_anime)
                );
            }

        } catch (error) {
            console.error(error);
        }
    };

    if (!usuario) return( 
        <div>
            <Header></Header>
            <Nav></Nav>
            <div className="perfil-login">
                <h1>No has iniciado sesión</h1>
                <button className="login-btn" onClick={() => navigate("/loginreg")}>Iniciar Sesión</button>
            </div>
            <Footer></Footer> 
        </div>)
     
    return (
        <div>
         <Header />
            <Nav />
            <div className="perfil-page">

            <h1>Perfil</h1>

            <p>{usuario.usuario}</p>

            <button onClick={logout}>
                Cerrar sesión
            </button>

            <h2>Animes favoritos</h2>

            {favoritos.length === 0 ? (
                <p>No tienes favoritos aún</p>
            ) : (
                <div className="favoritos-grid">
                    {favoritos.map((anime) => (
                        <div className="fav-card" key={anime.id_anime}>
                            <img
                                src={anime.imagen}
                                alt={anime.titulo}
                            />

                            <p>{anime.titulo}</p>

                            <button
                                onClick={() =>
                                    quitarFavorito(anime.id_anime)
                                }
                            >
                                Quitar
                            </button>
                        </div>
                    ))}
                </div>
            )}

            
        </div>
        <Footer />
    </div>
    );
}