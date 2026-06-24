import { useEffect, useState } from "react";
import TarjetaGato from "../components/TarjetaGato.jsx";
import { apiBaseUrl, crearUrl, pageSize } from "../gatos.js";

function Inicio({ esFavorito, cambiarFavorito, abrirDetalle, cerrarDetalle }) {
  const [gatos, setGatos] = useState([]);
  const [razas, setRazas] = useState([]);
  const [tipoImagen, setTipoImagen] = useState("");
  const [razaElegida, setRazaElegida] = useState("");
  const [mensajeEstado, setMensajeEstado] = useState("Cargando primeros gatos...");
  const [mensajeScroll, setMensajeScroll] = useState("Cargando más gatos...");
  const [estadoError, setEstadoError] = useState(false);
  const [scrollError, setScrollError] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [hayMasResultados, setHayMasResultados] = useState(true);

  useEffect(() => {
    cargarRazas();
  }, []);

  useEffect(() => {
    reiniciarGaleria();
  }, [tipoImagen, razaElegida]);

  useEffect(() => {
    function controlarScroll() {
      const posicionScroll = window.innerHeight + window.scrollY;
      const altoPagina = document.documentElement.scrollHeight;

      if (posicionScroll >= altoPagina - 500) {
        cargarGatos(false);
      }
    }

    window.addEventListener("scroll", controlarScroll);

    return () => {
      window.removeEventListener("scroll", controlarScroll);
    };
  }, [cargando, hayMasResultados, gatos, tipoImagen, razaElegida, razas]);

  async function cargarRazas() {
    try {
      const respuesta = await fetch(`${apiBaseUrl}/breeds`);

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar las razas.");
      }

      const datos = await respuesta.json();
      setRazas(datos);
    } catch (error) {
      setMensajeEstado("La galería funciona, pero no se pudo cargar el listado de razas.");
      setEstadoError(true);
    }
  }

  async function cargarGatos(reiniciar) {
    if (cargando || (!reiniciar && !hayMasResultados)) {
      return;
    }

    setCargando(true);
    setMensajeScroll("Cargando más gatos...");
    setScrollError(false);

    const gatosActuales = reiniciar ? [] : gatos;

    if (gatosActuales.length === 0) {
      setMensajeEstado("Cargando gatos...");
      setEstadoError(false);
    }

    try {
      const razaSeleccionada = razas.find((raza) => raza.id === razaElegida);
      const url = crearUrl("/images/search", {
        limit: String(pageSize),
        order: "RANDOM",
        size: "med",
        format: "json",
        mime_types: tipoImagen,
        breed_ids: razaElegida
      });
      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error("La API no respondió correctamente.");
      }

      let datos = await respuesta.json();
      datos = datos.slice(0, pageSize);

      if (razaSeleccionada) {
        datos = datos.map((gato) => ({
          ...gato,
          breeds: [razaSeleccionada]
        }));
      }

      if (datos.length === 0) {
        setHayMasResultados(false);
        setMensajeScroll("No hay más resultados para estos filtros.");

        if (gatosActuales.length === 0) {
          setMensajeEstado("No hay resultados para esos filtros.");
        }
      } else {
        let gatosNuevos = datos.filter((gato) => !gatosActuales.some((actual) => actual.id === gato.id));

        if (gatosNuevos.length === 0) {
          gatosNuevos = datos;
        }

        const listaActualizada = [...gatosActuales, ...gatosNuevos];
        setGatos(listaActualizada);
        setHayMasResultados(true);
        setMensajeEstado(`Mostrando ${listaActualizada.length} gatos.`);
        setMensajeScroll("Cargando más gatos al llegar al final...");
      }
    } catch (error) {
      setMensajeEstado("No se pudieron cargar imágenes. Revisa la conexión e inténtalo de nuevo.");
      setMensajeScroll("La carga se ha detenido por un error.");
      setEstadoError(true);
      setScrollError(true);
    }

    setCargando(false);
  }

  function reiniciarGaleria() {
    cerrarDetalle();
    setGatos([]);
    setHayMasResultados(true);
    window.scrollTo(0, 0);
    cargarGatos(true);
  }

  function limpiarFiltros() {
    setTipoImagen("");
    setRazaElegida("");
  }

  return (
    <main>
      <section className="hero">
        <div>
          <h1>Descubre gatos sin parar</h1>
        </div>
        <p>
          Explora imágenes reales de gatos, filtra por tipo o raza y guarda tus
          favoritos para volver a ellos cuando quieras.
        </p>
      </section>

      <section className="controls">
        <label htmlFor="image-type">Tipo de imagen</label>
        <select
          id="image-type"
          name="image-type"
          value={tipoImagen}
          onChange={(event) => setTipoImagen(event.target.value)}
        >
          <option value="">Todas</option>
          <option value="jpg,png">Fotos</option>
          <option value="gif">GIFs</option>
        </select>

        <label htmlFor="breed-select">Raza</label>
        <select
          id="breed-select"
          name="breed-select"
          value={razaElegida}
          onChange={(event) => setRazaElegida(event.target.value)}
        >
          <option value="">Todas las razas</option>
          {razas.map((raza) => (
            <option key={raza.id} value={raza.id}>
              {raza.name}
            </option>
          ))}
        </select>

        <button className="secondary-button" type="button" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
      </section>

      <p className={estadoError ? "status-message error" : "status-message"}>
        {mensajeEstado}
      </p>

      <section className="gallery">
        {gatos.map((gato) => (
          <TarjetaGato
            key={gato.id}
            gato={gato}
            esFavorito={esFavorito}
            cambiarFavorito={cambiarFavorito}
            abrirDetalle={abrirDetalle}
          />
        ))}
      </section>

      <p className={scrollError ? "scroll-message error" : "scroll-message"}>
        {mensajeScroll}
      </p>
    </main>
  );
}

export default Inicio;
