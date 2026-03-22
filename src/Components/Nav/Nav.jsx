import {NavLink} from "react-router-dom";

export default function Nav() {
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
                    <NavLink to="/login">Login/Registro</NavLink>
                </li>    
            </ul>
        </div>
    );
};