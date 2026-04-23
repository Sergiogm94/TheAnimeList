import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./nav.css";
import Buscador from "../Buscador/Buscador";

export default function Nav() {
    const [usuario, setUsuario] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mostrarBuscador, setMostrarBuscador] = useState(false);

    const navigate = useNavigate();

    // Función para obtener el usuario una vez que se ha logueado y mpostrarlo en el nav.
    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const res = await axios.get(
                    "http://localhost/TheAnimeList-Backend/perfil.php",
                    { withCredentials: true }
                );

                if (res.data.logged) {
                    setUsuario(res.data);
                } else {
                    setUsuario(null);
                }

            } catch (error) {
                console.log(error);
            }
        };

        obtenerUsuario();
    }, []);

    // Funcioón para hacer sticky en navbar.
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logout = async () => {
        try {
            await axios.get(
                "http://localhost/TheAnimeList-Backend/logout.php",
                { withCredentials: true }
            );

            setUsuario(null);
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };

    //Función para mostrar el buscador.
    const toggleSearch = () => {
        setMostrarBuscador(!mostrarBuscador);
    };

    return (
        <div className={`container ${scrolled ? "scrolled" : ""}`}>
            <ul className="nav-container">

                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/animes" className={({ isActive }) => isActive ? "active" : ""}>Animes</NavLink></li>
                <li><NavLink to="/personajes" className={({ isActive }) => isActive ? "active" : ""}>Personajes</NavLink></li>
                <li><NavLink to="/foro" className={({ isActive }) => isActive ? "active" : ""}>Foro</NavLink></li>
                <li><NavLink to="/perfil" className={({ isActive }) => isActive ? "active" : ""}>Perfil</NavLink></li>

                {!usuario ? (
                    <li>
                        <NavLink to="/loginreg">Login/Registro</NavLink>
                    </li>
                ) : (
                    <>
                        <li className="userData" onClick={() => navigate("/perfil")}>
                            👤 {usuario.usuario}
                        </li>
                        <li>
                            <button className="btnLogout" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </>
                )}

                <li className="spacer"></li>

                {mostrarBuscador && (
                    <li className="nav-search">
                        <Buscador />
                    </li>
                )}

                <li>
                    <div
                        className={`menu-icon ${mostrarBuscador ? "open" : ""}`}
                        onClick={toggleSearch}
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </li>

            </ul>
        </div>
    );
}