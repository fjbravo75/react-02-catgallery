import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import DetalleGato from "./components/DetalleGato.jsx";
import Inicio from "./pages/Inicio.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import { limpiarGatoParaGuardar, leerFavoritos, guardarFavoritos } from "./gatos.js";

function App() {
  const paginaInicial = document.body.getAttribute("data-page") === "favorites" ? "favorites" : "home";
  const [favoritos, setFavoritos] = useState(leerFavoritos);
  const [gatoDetalle, setGatoDetalle] = useState(null);

  const esFavorito = (idGato) => favoritos.some((gato) => gato.id === idGato);

  const cambiarFavorito = (gato) => {
    let nuevosFavoritos;

    if (esFavorito(gato.id)) {
      nuevosFavoritos = favoritos.filter((favorito) => favorito.id !== gato.id);
    } else {
      nuevosFavoritos = [...favoritos, limpiarGatoParaGuardar(gato)];
    }

    setFavoritos(nuevosFavoritos);
    guardarFavoritos(nuevosFavoritos);
  };

  return (
    <>
      <Header paginaActiva={paginaInicial} totalFavoritos={favoritos.length} />

      {paginaInicial === "favorites" ? (
        <Favoritos
          favoritos={favoritos}
          esFavorito={esFavorito}
          cambiarFavorito={cambiarFavorito}
          abrirDetalle={setGatoDetalle}
          cerrarDetalle={() => setGatoDetalle(null)}
        />
      ) : (
        <Inicio
          esFavorito={esFavorito}
          cambiarFavorito={cambiarFavorito}
          abrirDetalle={setGatoDetalle}
          cerrarDetalle={() => setGatoDetalle(null)}
        />
      )}

      {gatoDetalle && (
        <DetalleGato
          gato={gatoDetalle}
          esFavorito={esFavorito}
          cerrarDetalle={() => setGatoDetalle(null)}
        />
      )}

      <Footer />
    </>
  );
}

export default App;
