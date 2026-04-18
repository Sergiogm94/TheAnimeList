import { useEffect, useState } from "react";
import axios from "axios";

export default function ContenidoAnime() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const paginasFetch = [1, 2, 3];

        const requests = paginasFetch.map((pagina) =>
          axios
            .get(`http://localhost/TheAnimeList-Backend/apiAnimes.php?page=${pagina}`)
            .catch(() => null)
        );

        const responses = await Promise.all(requests);

        const todosAnimes = responses.flatMap(
          (res) => res?.data?.data || []
        );

        if (todosAnimes.length === 0) {
          console.warn("No hay animes");
          setLoading(false);
          return;
        }

        const mezclados = todosAnimes.sort(() => Math.random() - 0.5);
        setAnimes(mezclados.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  if (loading) return <p>Cargando animes...</p>;
  if (animes.length === 0) return <p>No se pudieron cargar animes</p>;

  return (
    <div>
      <h1>Animes aleatorios</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {animes.map((anime) => {
          if (!anime) return null;

          return (
            <div
              key={anime.mal_id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
              }}
            >
              <h3>{anime.title}</h3>

              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                width="100%"
              />

              <p>Popularidad: {anime.popularity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}