import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../Context/AuthContext";
import "./paginaAnime.css";

export default function PaginaAnime() {
  const location = useLocation();

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { usuario, favoritos, setFavoritos } = useContext(AuthContext);

  const busqueda = new URLSearchParams(location.search).get("q");

  // Funcion para cargar los animes según la busqueda.
  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://the-anime-list-backend.rf.gd/apiAnimes.php?q=${busqueda}`
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

  // Funcion para comprobar si un anime esta en favoritos.
  const esFavorito = (id_api) => {
    return favoritos?.some(
      (f) => Number(f.id_anime_api) === Number(id_api)
    );
  };

  //Funcion para añadir un anime a favorito.
  const añadirFavorito = async (anime) => {
    try {
      const res = await axios.post(
        "https://the-anime-list-backend.rf.gd/añadirFavorito.php",
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
        setFavoritos((prev) => [
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

  if (loading) {
    return (
      <div>
        <Header />
        <Nav />
        <p style={{ textAlign: "center", color: "white" }}>
          Cargando...
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Nav />

      <h2 className="result-title">
        Resultados para: {busqueda}
      </h2>

      <div className="anime-grid">
        {animes.map((anime) => {
          const favorito = esFavorito(anime.mal_id);

          return (
            <div key={anime.mal_id} className="anime-card">
              <h3>{anime.title}</h3>

              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
              />

              <p>
                {anime.synopsis?.slice(0, 150)}...
              </p>

              {usuario && (
                favorito ? (
                  <button className="fav-btn disabled" disabled>
                    ⭐ Ya está en favoritos
                  </button>
                ) : (
                  <button
                    className="fav-btn"
                    onClick={() => añadirFavorito(anime)}
                  >
                    ⭐ Añadir a favoritos
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
