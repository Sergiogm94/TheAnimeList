import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";

export default function PaginaPersonajes() {
  const [personaje, setPersonaje] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get(
          "http://localhost/TheAnimeList-Backend/apiPersonajes.php",
          {
            params: { page: pagina },
          }
        );

        console.log(res.data);

        setPersonaje(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacters();
  }, [pagina]);

  return (
    <div>
    <Header></Header>
    <Nav></Nav>
      <h1>Lista de Personajes (Página {pagina})</h1>

      {personaje.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        personaje.map((char) => (
          <div key={char.mal_id}>
            <h3>{char.name}</h3>
            <img src={char.images.jpg.image_url} width="120" />
          </div>
        ))
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPagina(prev => prev - 1)} disabled={pagina === 1}>
          ⬅️ Anterior
        </button>

        <button onClick={() => setPagina(prev => prev + 1)}>
          Siguiente ➡️
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
}