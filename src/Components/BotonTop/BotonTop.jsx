import { useEffect, useState } from "react";
import "./botonTop.css";

export default function BotonTop() {
    const [visible, setVisible] = useState(false);

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