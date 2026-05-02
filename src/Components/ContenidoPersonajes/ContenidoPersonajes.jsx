import { useEffect, useState } from "react";
import axios from "axios";
import "./contenidoPersonajes.css";

export default function ContenidoPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  // Función para llamar al endpoint php de personajes.
  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        // Número de paginas de la api en que se va a buscar.
        const paginasFetch = [1, 2, 3];

        const requests = paginasFetch.map((pagina) =>
          axios
            .get(`https://theanimelist-backend.onrender.com/apiPersonajes.php?page=${pagina}`)
            .catch(() => null)
        );

        const responses = await Promise.all(requests);

        const todosPersonajes = responses.flatMap(
          (res) => res?.data?.data || []
        );
        // La api a veces da null, así nos aseguramos de que siempre aparazcan personajes.
        if (todosPersonajes.length === 0) 
          { console.warn("No hay personajes");
             setLoading(false); return;
            }

        const mezclados = todosPersonajes.sort(() => Math.random() - 0.5);

        setPersonajes(mezclados.slice(0, 12));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonajes();
  }, []);

  if (loading) return <p className="loading">Cargando personajes...</p>;

  if (personajes.length === 0)
    return <p className="error">No se pudieron cargar personajes</p>;

  return (
    <div className="personajes-section">
      <h1 className="title">Personajes populares</h1>

      <div className="grid">
        {personajes.map((personaje) => (
          <div
            className="card"
            key={personaje.mal_id}
            onClick={() => setPersonajeSeleccionado(personaje)}
          >
            <img
              src={personaje.images?.jpg?.image_url}
              alt={personaje.name}
            />

            <h3>{personaje.name}</h3>
          </div>
        ))}
      </div>

      {/*Modla*/}
      {personajeSeleccionado && (
        <div
          className="modal-overlay"
          onClick={() => setPersonajeSeleccionado(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={personajeSeleccionado.images?.jpg?.image_url}
              alt={personajeSeleccionado.name}
            />

            <h2>{personajeSeleccionado.name}</h2>

            <button onClick={() => setPersonajeSeleccionado(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}