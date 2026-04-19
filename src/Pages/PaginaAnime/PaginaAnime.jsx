import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";

export default function PaginaAnime() {
  const location = useLocation();

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { usuario, favoritos, setFavoritos } = useContext(AuthContext);

  const busqueda = new URLSearchParams(location.search).get("q");

  // 🔍 cargar animes
  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost/TheAnimeList-Backend/apiAnimes.php?q=${busqueda}`
        );

        setAnimes(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (busqueda) fetchAnimes();
  }, [busqueda]);

  // 🧠 comprobar favorito
  const esFavorito = (id_api) => {
    return favoritos?.some(f => Number(f.id_anime_api) === Number(id_api));
  };

  // ⭐ añadir favorito
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
        setFavoritos(prev => [
          ...prev,
          {
            id_anime: res.data.id_anime,
            id_anime_api: anime.mal_id,
            titulo: anime.title,
            imagen: anime.images?.jpg?.image_url
          }
        ]);
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

      {animes.map((anime) => {
        const favorito = esFavorito(anime.mal_id);

        return (
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

            {/* BOTÓN SIMPLIFICADO */}
            {usuario && (
              favorito ? (
                <button disabled style={{ opacity: 0.6 }}>
                  ⭐ Ya está en favoritos
                </button>
              ) : (
                <button onClick={() => añadirFavorito(anime)}>
                  ⭐ Añadir a favoritos
                </button>
              )
            )}
          </div>
        );
      })}

      <Footer />
    </div>
  );
}
