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

  const [animeSeleccionado, setAnimeSeleccionado] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const { usuario, favoritos, setFavoritos } = useContext(AuthContext);

  const busqueda = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://theanimelist-backend.onrender.com/apiAnimes.php?q=${busqueda}`
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

  const esFavorito = (id_api) => {
    return favoritos?.some(
      (f) => Number(f.id_anime_api) === Number(id_api)
    );
  };

  const añadirFavorito = async (anime) => {
    try {
      const res = await axios.post(
        "https://theanimelist-backend.onrender.com/añadirFavorito.php",
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

  // 🔥 ABRIR MODAL CON DETALLE
  const abrirModal = async (anime) => {
    setLoadingModal(true);
    setAnimeSeleccionado(null);

    try {
      const res = await axios.get(
        `https://api.jikan.moe/v4/anime/${anime.mal_id}`
      );

      setAnimeSeleccionado(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingModal(false);
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
            <div
              key={anime.mal_id}
              className="anime-card"
              onClick={() => abrirModal(anime)}
            >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      añadirFavorito(anime);
                    }}
                  >
                    ⭐ Añadir a favoritos
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {animeSeleccionado && (
        <div
          className="modal-overlay"
          onClick={() => setAnimeSeleccionado(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={animeSeleccionado.images?.jpg?.image_url}
              alt={animeSeleccionado.title}
            />

            <h2>{animeSeleccionado.title}</h2>

            <p>
              <strong>Año:</strong>{" "}
              {animeSeleccionado.year || "Desconocido"}
            </p>

            <p className="modal-synopsis">
              {animeSeleccionado.synopsis ||
                "Sin sinopsis disponible"}
            </p>

            {loadingModal ? (
              <p className="loading">Cargando trailer...</p>
            ) : animeSeleccionado?.trailer?.youtube_id ? (
              <iframe
                width="100%"
                height="200"
                src={`https://www.youtube.com/embed/${animeSeleccionado.trailer.youtube_id}`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <div> <a
                className="youtube-link"
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  animeSeleccionado.title + " trailer"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                🔎 Buscar trailer en YouTube
              </a>
               <a
                className="youtube-link"
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  animeSeleccionado.title + " openings"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                🎤 Buscar openings en YouTube
              </a>
              </div>
                
            )}

            <button onClick={() => setAnimeSeleccionado(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
