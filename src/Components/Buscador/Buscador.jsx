import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Buscador() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  // Función común para buscar
  const handleSearch = () => {
    if (busqueda.trim() !== "") {
      navigate(`/anime?q=${encodeURIComponent(busqueda)}`);
    }
  };

  // Detectar tecla Enter para empezar la busqueda.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar anime..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

