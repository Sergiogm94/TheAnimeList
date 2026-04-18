import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../context/authContext";

export default function PaginaAnime() {
  const location = useLocation();
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { usuario } = useContext(AuthContext);

  // Obtener el query de la URL
  const busqueda = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost/TheAnimeList-Backend/apiAnimes.php?q=${busqueda}`
        );

        console.log(res.data.data);
        setAnimes(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (busqueda) {
      fetchAnimes();
    }
  }, [busqueda]);

  const añadirFavorito = async (anime) => {
    try {
      const res = await axios.post(
        "http://localhost/TheAnimeList-Backend/añadirFavorito.php",
        {
          id_anime_api: anime.mal_id,
          titulo: anime.title,
          imagen: anime.images?.jpg?.image_url,
          tipo: anime.type,
          sipnosis: anime.synopsis
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Añadido a favoritos ⭐");
      } else {
        alert(res.data.mensaje);
      }

    } catch (error) {
      console.error(error);
      alert("Error al añadir favorito");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <Header />
      <Nav />

      <h2>Resultados para: {busqueda}</h2>

      {animes.map((anime) => (
        <div
          key={anime.mal_id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "15px"
          }}
        >
          <h3>{anime.title}</h3>

          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            width="150"
          />

          <p>{anime.synopsis?.slice(0, 150)}...</p>

          {/* Botón solo si está logueado */}
          {usuario && (
            <button onClick={() => añadirFavorito(anime)}>
              ⭐ Añadir a favoritos
            </button>
          )}
        </div>
      ))}

      <Footer />
    </div>
  );
}
