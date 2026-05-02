import "./header.css";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="header-container">
            <img
                className="logo"
                src={logo}
                alt="logo"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
            />
        </div>
    );
}