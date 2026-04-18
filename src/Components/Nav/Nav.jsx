import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Nav() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const res = await axios.get(
                    "http://localhost/TheAnimeList-Backend/perfil.php",
                    {
                        withCredentials: true
                    }
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

    const logout = async () => {
        try {
            await axios.get(
                "http://localhost/TheAnimeList-Backend/logout.php",
                {
                    withCredentials: true
                }
            );

            setUsuario(null);
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div>
            <h1>Nav</h1>

            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/animes">Animes</NavLink>
                </li>
                <li>
                    <NavLink to="/personajes">Personajes</NavLink>
                </li>
                  <li>
                    <NavLink to="/foro">Foro</NavLink>
                </li>
                                  <li>
                    <NavLink to="/perfil">Perfil</NavLink>
                </li>

                {!usuario ? (
                    <li>
                        <NavLink to="/loginreg">Login/Registro</NavLink>
                    </li>
                ) : (
                    <>
                        <li onClick={() => navigate("/perfil")}>
                            👤 {usuario.usuario}
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};