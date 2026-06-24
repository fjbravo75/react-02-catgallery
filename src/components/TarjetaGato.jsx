import { obtenerDescripcionGato, obtenerTituloGato } from "../gatos.js";

function TarjetaGato({ gato, esFavorito, cambiarFavorito, abrirDetalle }) {
  const favoritoActivo = esFavorito(gato.id);

  return (
    <article className="cat-card">
      <div className="image-frame">
        <img src={gato.url} alt={obtenerTituloGato(gato)} />
      </div>

      <div className="cat-card-content">
        <h3>{obtenerTituloGato(gato)}</h3>
        <p>{obtenerDescripcionGato(gato)}</p>

        <div className="card-actions">
          <button
            className={favoritoActivo ? "favorite-button is-active" : "favorite-button"}
            type="button"
            onClick={() => cambiarFavorito(gato)}
          >
            <span className="heart-icon" aria-hidden="true">
              {favoritoActivo ? "♥" : "♡"}
            </span>
            <span>{favoritoActivo ? "Quitar favorito" : "Marcar favorito"}</span>
          </button>

          <button
            className="secondary-button detail-button"
            type="button"
            onClick={() => abrirDetalle(gato)}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}

export default TarjetaGato;

