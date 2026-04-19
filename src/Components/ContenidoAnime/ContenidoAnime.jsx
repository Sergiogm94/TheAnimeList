import { useEffect, useState } from "react";
import axios from "axios";
import "./contenidoAnime.css";

export default function ContenidoAnime() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [animeSeleccionado, setAnimeSeleccionado] = useState(null); // 🔥 modal

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const paginasFetch = [1, 2, 3];

        const requests = paginasFetch.map((pagina) =>
          axios.get(`http://localhost/TheAnimeList-Backend/apiAnimes.php?page=${pagina}`)
          .catch(() => null)
        );

        const responses = await Promise.all(requests);

        const todosAnimes = responses.flatMap(
          (res) => res?.data?.data || []
        );

        if (todosAnimes.length === 0)
          { console.warn("No hay animes");
          setLoading(false); return; 
        }

        const mezclados = todosAnimes.sort(() => Math.random() - 0.5);

        setAnimes(mezclados.slice(0, 12));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  if (loading) return <p className="anime-loading">Cargando animes...</p>;

  return (
    <div className="anime-section">
      <h1 className="anime-title">Animes recomendados</h1>

      <div className="anime-grid">
        {animes.map((anime) => (
          <div
            className="anime-card"
            key={anime.mal_id}
            onClick={() => setAnimeSeleccionado(anime)} // 🔥 abrir modal
          >
            <img src={anime.images?.jpg?.image_url} alt={anime.title} />

            <div className="anime-info">
              <h3>{anime.title}</h3>
              <p>Año: {anime.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      {animeSeleccionado && (
        <div className="modal-overlay" onClick={() => setAnimeSeleccionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <img
              src={animeSeleccionado.images?.jpg?.image_url}
              alt={animeSeleccionado.title}
            />

            <h2>{animeSeleccionado.title}</h2>

            <p>
              <strong>Popularidad:</strong> {animeSeleccionado.popularity}
            </p>

            <p>
              <strong>Score:</strong> {animeSeleccionado.score}
            </p>
             <p>
              <strong>Año:</strong> {animeSeleccionado.year}
            </p>

            <button onClick={() => setAnimeSeleccionado(null)}>
              Cerrar
            </button>

          </div>
        </div>
      )}
    </div>
  );
}