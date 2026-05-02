import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./nav.css";
import Buscador from "../Buscador/Buscador";

export default function Nav() {
    const [usuario, setUsuario] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const res = await axios.get(
                    "https://theanimelist-backend.onrender.com/perfil.php",
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
                "https://theanimelist-backend.onrender.com/logout.php",
                { withCredentials: true }
            );

            setUsuario(null);
            navigate("/");
            setMenuOpen(false);

        } catch (error) {
            console.log(error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className={`container ${scrolled ? "scrolled" : ""}`}>

            <ul className={`nav-container ${menuOpen ? "open" : ""}`}>

                <li>
                    <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/animes" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                        Animes
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/personajes" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                        Personajes
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/foro" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                        Foro
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/perfil" onClick={closeMenu} className={({ isActive }) => isActive ? "active" : ""}>
                        Perfil
                    </NavLink>
                </li>

                {!usuario ? (
                    <li>
                        <NavLink to="/loginreg" onClick={closeMenu}>
                            Login/Registro
                        </NavLink>
                    </li>
                ) : (
                    <>
                        <li className="userData" onClick={() => { navigate("/perfil"); closeMenu(); }}>
                            👤 {usuario.usuario}
                        </li>

                        <li>
                            <button className="btnLogout" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </>
                )}

                <li className="nav-search">
                    <Buscador />
                </li>

            </ul>

            <div
                className={`menu-icon ${menuOpen ? "open" : ""}`}
                onClick={toggleMenu}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

        </div>
    );
}