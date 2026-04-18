import BuscadorAnime from "../../Components/Buscador/Buscador";
import ContenidoAnime from "../../Components/ContenidoAnime/ContenidoAnime";
import ContenidoPersonajes from "../../Components/ContenidoPersonajes/ContenidoPersonajes";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";

export default function Home() {
   return(
    <div>
        <Header></Header>
        <Nav></Nav>
        <BuscadorAnime></BuscadorAnime>
        <h1>hola</h1>  
        <ContenidoAnime></ContenidoAnime>
        <ContenidoPersonajes></ContenidoPersonajes>
        <Footer></Footer>
    </div>
    ); 
};
