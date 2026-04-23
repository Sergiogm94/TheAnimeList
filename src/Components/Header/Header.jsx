import "./header.css";
import logo from "../../assets/Logo.png";

export default function Header() {
    return (
        <div className="header-container">
            <img className="logo" src={logo} alt="logo" />
        </div>
    );
}