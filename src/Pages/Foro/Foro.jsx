import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";

export default function Foro() {
  const { usuario } = useContext(AuthContext);

  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");

  const fetchComentarios = async () => {
    try {
      const res = await axios.get(
        "http://localhost/TheAnimeList-Backend/recuperarComentarios.php",
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

    if (!usuario) {
      alert("Debes iniciar sesión");
      return;
    }

    try {
      await axios.post(
        "http://localhost/TheAnimeList-Backend/crearComentario.php",
        {
          contenido: texto
        },
        { withCredentials: true }
      );
      console.log(texto);
      setTexto("");
      fetchComentarios();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <Header></Header>
    <Nav></Nav>
      <h1>Foro</h1>

      <div>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe un comentario..."
        />

        <button onClick={enviarComentario}>
          Enviar
        </button>
      </div>

      <hr />

      <div>
        {comentarios.map((c) => (
          <div key={c.id_comentario} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p><strong>{c.nombre_usuario}</strong></p>
            <p>{c.contenido}</p>
            <small>{c.fecha}</small>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}