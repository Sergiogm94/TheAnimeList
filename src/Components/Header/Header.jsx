import "./header.css";
import logo from "../../assets/Logo.png";

export default function Header() {
    return (
        <div className="headDiv">
            <img className="logo" src={logo} alt="logo" />
        </div>
    );
}