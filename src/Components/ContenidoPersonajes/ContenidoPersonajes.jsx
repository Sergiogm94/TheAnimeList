import { useEffect, useState } from "react";
import axios from "axios";

export default function ContenidoPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const paginasFetch = [1, 2, 3];

        const requests = paginasFetch.map((pagina) =>
          axios
            .get(`http://localhost/TheAnimeList-Backend/apiPersonajes.php?page=${pagina}`)
            .catch(() => null)
        );

        const responses = await Promise.all(requests);

        const todosPersonajes = responses.flatMap(
          (res) => res?.data?.data || []
        );

        if (todosPersonajes.length === 0) {
          console.warn("No hay personajes");
          setLoading(false);
          return;
        }

        const mezclados = todosPersonajes.sort(() => Math.random() - 0.5);
        setPersonajes(mezclados.slice(0, 5));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonajes();
  }, []);

  if (loading) return <p>Cargando personajes...</p>;
  if (personajes.length === 0) return <p>No se pudieron cargar personajes</p>;

  return (
    <div>
      <h1>Personajes aleatorios</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {personajes.map((personaje) => {
          if (!personaje) return null;

          return (
            <div
              key={personaje.mal_id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
              }}
            >
              <h3>{personaje.name}</h3>

              <img
                src={personaje.images?.jpg?.image_url}
                alt={personaje.name}
                width="100%"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}