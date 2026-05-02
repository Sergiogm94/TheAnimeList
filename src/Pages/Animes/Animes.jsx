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
                onClick={() => {
                console.log(anime.title, anime.trailer);
                setAnimeSeleccionado(anime)}}
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

            {animeSeleccionado.trailer?.youtube_id ? (
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${animeSeleccionado.trailer.youtube_id}`}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="no-trailer">No hay trailer disponible</p>
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