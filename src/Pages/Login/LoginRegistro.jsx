import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import Login from "../../Components/Login/Login";
import Registro from "../../Components/Registro/Registro";

export default function LoginRegistro() {
    const [mostrarLogin, setMostrarLogin] = useState(true);

    return(
        <div>
            <Header></Header>
            <Nav></Nav>
             <h1>Pagina de login y registro</h1>
                <div>
                <button onClick={() => setMostrarLogin(true)}>Login</button>
                <button onClick={() => setMostrarLogin(false)}>Registro</button>
                </div>
                {mostrarLogin ?
                (<Login></Login>) :
                (<Registro></Registro>)}
            <Footer></Footer>  
        </div>

    );
};