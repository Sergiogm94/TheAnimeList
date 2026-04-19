import "./footer.css";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* LOGO */}
                <h2 className="footer-logo">TheAnimeList</h2>

                <p className="footer-text">
                    Descubre, comparte y disfruta del mundo del anime.
                </p>

                {/* LINKS */}
                <ul className="footer-links">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/animes">Animes</NavLink></li>
                    <li><NavLink to="/personajes">Personajes</NavLink></li>
                    <li><NavLink to="/foro">Foro</NavLink></li>
                </ul>

                {/* REDES SOCIALES */}
                <div className="footer-social">
                    <a href="#"><FaGithub /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaYoutube /></a>
                </div>

                {/* COPYRIGHT */}
                <span className="footer-copy">
                    © {new Date().getFullYear()} TheAnimeList. Todos los derechos reservados.
                </span>

            </div>
        </footer>
    );
}