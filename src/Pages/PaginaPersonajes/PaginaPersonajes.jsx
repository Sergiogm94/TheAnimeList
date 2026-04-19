import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import "./paginaPersonajes.css";

export default function PaginaPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [animando, setAnimando] = useState(false);

  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  const [animesPersonaje, setAnimesPersonaje] = useState([]);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setAnimando(true);

      try {
        const res = await axios.get(
          "http://localhost/TheAnimeList-Backend/apiPersonajes.php",
          {
            params: { page: pagina },
          }
        );

        setPersonajes(res.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);

        setTimeout(() => {
          setAnimando(false);
        }, 300);
      }
    };

    fetchCharacters();
  }, [pagina]);

  // 🔥 CLICK PERSONAJE (con fetch extra)
  const handleClickPersonaje = async (char) => {
    setPersonajeSeleccionado(char);
    setLoadingDetalle(true);
    setAnimesPersonaje([]);

    try {
      const res = await axios.get(
        `https://api.jikan.moe/v4/characters/${char.mal_id}/full`
      );

      setAnimesPersonaje(res.data.data.anime || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetalle(false);
    }
  };

  return (
    <div>
      <Header />
      <Nav />

      <div className="personajes-page">
        <h1 className="title">Lista de Personajes</h1>

        {/* LOADING */}
        {loading ? (
          <p className="loading">Cargando personajes...</p>
        ) : (
          <div className={`grid ${animando ? "fade" : ""}`}>
            {personajes.map((char) => (
              <div
                className="card"
                key={char.mal_id}
                onClick={() => handleClickPersonaje(char)}
              >
                <img
                  src={char.images?.jpg?.image_url}
                  alt={char.name}
                />
                <h3>{char.name}</h3>
              </div>
            ))}
          </div>
        )}

        {/* PAGINACIÓN */}
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

      {/* 🔥 MODAL */}
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

            <p>
              <strong>Favoritos:</strong>{" "}
              {personajeSeleccionado.favorites || "N/A"}
            </p>

            <p className="modal-about">
              {personajeSeleccionado.about
                ? personajeSeleccionado.about.slice(0, 300) + "..."
                : "Sin descripción disponible"}
            </p>

            {/* 🔥 ANIMES DONDE APARECE */}
            <h3>Animes donde aparece</h3>

            {loadingDetalle ? (
              <p>Cargando animes...</p>
            ) : animesPersonaje.length > 0 ? (
              <div className="anime-list">
                {animesPersonaje.slice(0, 8).map((a) => (
                  <div
                    key={a.anime.mal_id}
                    className="anime-item"
                  >
                    <img
                      src={a.anime.images.jpg.image_url}
                      alt={a.anime.title}
                    />
                    <p>{a.anime.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay información de animes</p>
            )}

            <button onClick={() => setPersonajeSeleccionado(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}