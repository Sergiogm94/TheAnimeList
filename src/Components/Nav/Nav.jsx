import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./nav.css";
import Buscador from "../Buscador/Buscador";

export default function Nav() {
    const [usuario, setUsuario] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const res = await axios.get(
                    "https://theanimelist-backend.onrender.com/perfil.php",
                    { withCredentials: true }
                );

                if (res.data.logged) setUsuario(res.data);
                else setUsuario(null);
            } catch (error) {
                console.log(error);
            }
        };

        obtenerUsuario();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logout = async () => {
        try {
            await axios.get(
                "https://theanimelist-backend.onrender.com/logout.php",
                { withCredentials: true }
            );

            setUsuario(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`container ${scrolled ? "scrolled" : ""}`}>

            <div className="nav-wrapper">

                {/* NAV LINKS */}
                <ul className={`nav-container ${menuAbierto ? "open" : ""}`}>

                    <li><NavLink to="/" onClick={() => setMenuAbierto(false)}>Home</NavLink></li>
                    <li><NavLink to="/animes" onClick={() => setMenuAbierto(false)}>Animes</NavLink></li>
                    <li><NavLink to="/personajes" onClick={() => setMenuAbierto(false)}>Personajes</NavLink></li>
                    <li><NavLink to="/foro" onClick={() => setMenuAbierto(false)}>Foro</NavLink></li>
                    <li><NavLink to="/perfil" onClick={() => setMenuAbierto(false)}>Perfil</NavLink></li>

                    {!usuario ? (
                        <li>
                            <NavLink to="/loginreg" onClick={() => setMenuAbierto(false)}>
                                Login/Registro
                            </NavLink>
                        </li>
                    ) : (
                        <>
                            <li
                                className="userData"
                                onClick={() => {
                                    navigate("/perfil");
                                    setMenuAbierto(false);
                                }}
                            >
                                👤 {usuario.usuario}
                            </li>

                            <li>
                                <button className="btnLogout" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}

                    {/* 🔥 BUSCADOR MÓVIL AL FINAL DEL MENÚ */}
                    <li className="mobile-search">
                        <Buscador />
                    </li>

                </ul>

                {/* 🔥 BUSCADOR DESKTOP (DERECHA) */}
                <div className="desktop-search">
                    <Buscador />
                </div>

                {/* HAMBURGER */}
                <div
                    className={`menu-icon ${menuAbierto ? "open" : ""}`}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

            </div>
        </div>
    );
}