import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";
import "./animes.css";

export default function Animes() {
  const [animes, setAnimes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [animando, setAnimando] = useState(false);

  const [animeSeleccionado, setAnimeSeleccionado] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    const fetchAnimes = async () => {
      setLoading(true);
      setAnimando(true);

      try {
        const res = await axios.get(
          "https://theanimelist-backend.onrender.com/apiAnimes.php",
          {
            params: { page: pagina },
          }
        );

        setAnimes(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);

        setTimeout(() => {
          setAnimando(false);
        }, 300);
      }
    };

    fetchAnimes();
  }, [pagina]);

  const handleAnimeClick = async (anime) => {
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

  return (
    <div>
      <Header />
      <Nav />

      <div className="anime-page">
        <h1 className="title">Lista de Animes</h1>

        {loading ? (
          <p className="loading">Cargando animes...</p>
        ) : (
          <div className={`anime-grid ${animando ? "fade" : ""}`}>
            {animes.map((anime) => (
              <div
                className="anime-card"
                key={anime.mal_id}
                onClick={() => handleAnimeClick(anime)}
              >
                <img
                  src={anime.images?.jpg?.image_url}
                  alt={anime.title}
                />

                <div className="anime-info">
                  <h3>{anime.title}</h3>
                  <p>
                    {anime.synopsis
                      ? anime.synopsis.slice(0, 90) + "..."
                      : "Sin sinopsis"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          <button
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
          >
            ⬅️ Anterior
          </button>

          <span>Página {pagina}</span>

          <button onClick={() => setPagina((p) => p + 1)}>
            Siguiente ➡️
          </button>
        </div>
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

            {/* TRAILER O YOUTUBE FALLBACK */}
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
              <a
                className="youtube-link"
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  animeSeleccionado.title + " trailer"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                🔎 Buscar trailer en YouTube
              </a>
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