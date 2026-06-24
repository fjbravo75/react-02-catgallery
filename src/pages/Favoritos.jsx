import { useEffect, useState } from "react";
import TarjetaGato from "../components/TarjetaGato.jsx";
import { pageSize } from "../gatos.js";

function Favoritos({ favoritos, esFavorito, cambiarFavorito, abrirDetalle, cerrarDetalle }) {
  const [paginaFavoritos, setPaginaFavoritos] = useState(0);
  const totalPaginas = Math.ceil(favoritos.length / pageSize);
  const inicioPagina = paginaFavoritos * pageSize;
  const favoritosPagina = favoritos.slice(inicioPagina, inicioPagina + pageSize);

  useEffect(() => {
    if (paginaFavoritos > totalPaginas - 1) {
      setPaginaFavoritos(Math.max(totalPaginas - 1, 0));
    }
  }, [favoritos.length, paginaFavoritos, totalPaginas]);

  function paginaAnterior() {
    if (paginaFavoritos > 0) {
      cerrarDetalle();
      setPaginaFavoritos(paginaFavoritos - 1);
    }
  }

  function paginaSiguiente() {
    if (paginaFavoritos < totalPaginas - 1) {
      cerrarDetalle();
      setPaginaFavoritos(paginaFavoritos + 1);
    }
  }

  function obtenerMensajeFavoritos() {
    if (favoritos.length === 0) {
      return "Cuando marques un gato como favorito aparecerá aquí.";
    }

    if (favoritos.length === 1) {
      return "Tienes 1 gato favorito guardado.";
    }

    return `Tienes ${favoritos.length} gatos favoritos guardados.`;
  }

  return (
    <main>
      <section className="hero hero-simple">
        <div>
          <h1>Tus gatos favoritos</h1>
        </div>
        <p>
          Aquí encontrarás los gatos que has guardado para volver a verlos
          cuando quieras.
        </p>
      </section>

      <p className="status-message">{obtenerMensajeFavoritos()}</p>

      {favoritos.length === 0 && (
        <p className="empty-message">
          Todavía no has guardado ningún favorito.
        </p>
      )}

      <section className="gallery">
        {favoritosPagina.map((gato) => (
          <TarjetaGato
            key={gato.id}
            gato={gato}
            esFavorito={esFavorito}
            cambiarFavorito={cambiarFavorito}
            abrirDetalle={abrirDetalle}
          />
        ))}
      </section>

      {totalPaginas > 1 && (
        <section className="pagination">
          <button
            className="pagination-link"
            type="button"
            disabled={paginaFavoritos === 0}
            onClick={paginaAnterior}
          >
            Anterior
          </button>
          <span>Página {paginaFavoritos + 1} de {totalPaginas}</span>
          <button
            className="pagination-link"
            type="button"
            disabled={paginaFavoritos >= totalPaginas - 1}
            onClick={paginaSiguiente}
          >
            Siguiente
          </button>
        </section>
      )}
    </main>
  );
}

export default Favoritos;

