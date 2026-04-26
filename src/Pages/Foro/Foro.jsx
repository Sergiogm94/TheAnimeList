import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import "./foro.css";

export default function Foro() {
  const { usuario } = useContext(AuthContext);

  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComentarios = async () => {
    try {
      const res = await axios.get(
        "https://the-anime-list-backend.rf.gd/recuperarComentarios.php",
        { withCredentials: true }
      );

      setComentarios(res.data.comentarios || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

  const enviarComentario = async () => {
    if (!texto.trim()) return;

    if (!usuario) return;

    setLoading(true);

    try {
      await axios.post(
        "https://the-anime-list-backend.rf.gd/crearComentario.php",
        { contenido: texto },
        { withCredentials: true }
      );

      setTexto("");
      fetchComentarios();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Nav />

      <div className="foro-page">
        <h1 className="title">Foro Anime</h1>

        <div className="comentario-box">
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={
              usuario
                ? "Escribe tu comentario..."
                : "Inicia sesión para comentar"
            }
            disabled={!usuario}
          />

          <button
            onClick={enviarComentario}
            disabled={!usuario || loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>

        <div className="comentarios-lista">
          {comentarios.length === 0 ? (
            <p className="empty">No hay comentarios aún</p>
          ) : (
            comentarios.map((c) => (
              <div key={c.id_comentario} className="comentario">
                <div className="comentario-header">
                  <strong>{c.nombre_usuario}</strong>
                  <span>{c.fecha}</span>
                </div>

                <p>{c.contenido}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}