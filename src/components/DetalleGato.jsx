import {
  obtenerResumenDetalle,
  obtenerRaza,
  obtenerTituloGato,
  traducirOrigen,
  traducirTemperamento
} from "../gatos.js";

function FilaDetalle({ titulo, valor }) {
  return (
    <>
      <dt>{titulo}</dt>
      <dd>{valor}</dd>
    </>
  );
}

function DetalleGato({ gato, esFavorito, cerrarDetalle }) {
  const raza = obtenerRaza(gato);

  return (
    <div className="cat-detail">
      <button className="secondary-button" type="button" onClick={cerrarDetalle}>
        Cerrar detalle
      </button>

      <div className="detail-card">
        <p className="detail-badge">
          {raza ? "Raza identificada" : "Sin raza identificada"}
        </p>
        <h2>{raza ? `Ficha de ${raza.name}` : `Ficha del gato #${gato.id}`}</h2>
        <img src={gato.url} alt={obtenerTituloGato(gato)} />
        <p className="detail-summary">{obtenerResumenDetalle(gato, raza)}</p>

        <dl>
          {raza ? (
            <>
              <FilaDetalle titulo="Raza" valor={raza.name} />
              <FilaDetalle titulo="Origen" valor={traducirOrigen(raza.origin)} />
              <FilaDetalle titulo="Vida media" valor={`${raza.life_span} años`} />
              {raza.weight && raza.weight.metric && (
                <FilaDetalle titulo="Peso aprox." valor={`${raza.weight.metric} kg`} />
              )}
              {raza.temperament && (
                <FilaDetalle titulo="Carácter" valor={traducirTemperamento(raza.temperament)} />
              )}
            </>
          ) : (
            <>
              <FilaDetalle titulo="Raza" valor="No identificada en la API" />
              <FilaDetalle titulo="Datos disponibles" valor="Imagen, referencia y tamaño" />
            </>
          )}

          <FilaDetalle
            titulo="Favorito"
            valor={esFavorito(gato.id) ? "Guardado en tus favoritos" : "Aún no está guardado"}
          />
          <FilaDetalle titulo="Tamaño imagen" valor={`${gato.width} x ${gato.height} px`} />
          <FilaDetalle titulo="Referencia" valor={`#${gato.id}`} />
        </dl>
      </div>
    </div>
  );
}

export default DetalleGato;

