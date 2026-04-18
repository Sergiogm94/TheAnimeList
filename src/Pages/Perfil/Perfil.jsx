import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Nav from "../../Components/Nav/Nav";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Perfil() {
    const { usuario, logout } = useContext(AuthContext);

    if (!usuario) {
        return (
            <div>
                <Header />
                <Nav />
                <h1>No has iniciado sesión</h1>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Nav />

            <h1>Perfil del usuario</h1>

            <div style={{ padding: "20px" }}>
                <p><strong>Usuario:</strong> {usuario.usuario}</p>
                <p><strong>Email:</strong> {usuario.email}</p>

                <button onClick={logout}>
                    Cerrar sesión
                </button>
            </div>

            <Footer />
        </div>
    );
}