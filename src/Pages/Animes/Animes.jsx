import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";

export default function Animes() {
  const [animes, setAnimes] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const res = await axios.get(
          "http://localhost/TheAnimeList-Backend/apiAnimes.php", {
            params: {page: pagina},
          }
        );

        console.log(res.data);

        setAnimes(res.data.data); // 👈 guardamos los animes
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimes();
  }, [pagina]);

  return (
    <div>
    <Header></Header>
    <Nav></Nav>
      <h1>Lista de Animes</h1>

    {animes.length === 0 ? (
    <p>Cargando...</p>
        ) : (
    animes.map((anime) => (
    <div key={anime.mal_id}>
      <h3>{anime.title}</h3>
      <img src={anime.images.jpg.image_url} width="120" />
      <p>{anime.synopsis}</p>
    </div>
    ))
)}
<div style={{ marginTop: "20px" }}>
        <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
          ⬅️ Anterior
        </button>

        <button onClick={() => setPagina(pagina + 1)}>
          Siguiente ➡️
        </button>
      </div>
<Footer></Footer>
</div>
  );
}