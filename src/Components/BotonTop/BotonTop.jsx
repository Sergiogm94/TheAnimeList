import { useEffect, useState } from "react";
import "./botonTop.css";

export default function BotonTop() {
    const [visible, setVisible] = useState(false);

    // Función para que aparzca el boton.
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Funcioón para volver al top de la web.
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {visible && (
                <button className="btn-top" onClick={scrollTop}>
                    ↑ TOP
                </button>
            )}
        </>
    );
}