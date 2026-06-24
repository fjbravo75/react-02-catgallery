import { j as jsxRuntimeExports, r as reactExports, c as clientExports } from "./react.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function Header({ paginaActiva, totalFavoritos }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "site-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-inner", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "brand", href: "index.html", children: "CatGallery" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "main-nav", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: paginaActiva === "home" ? "is-active" : "", href: "index.html", children: "Inicio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: paginaActiva === "favorites" ? "is-active" : "", href: "favoritos.html", children: [
        "Favoritos ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: totalFavoritos })
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "site-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-inner", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "CatGallery - Proyecto React" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Datos de ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://thecatapi.com/", children: "The Cat API" })
    ] })
  ] }) });
}
const apiBaseUrl = "https://api.thecatapi.com/v1";
const storageKey = "catgallery_react_favorites";
const pageSize = 9;
function crearUrl(path, params) {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] !== "") {
      query.append(key, params[key]);
    }
  });
  return `${apiBaseUrl}${path}?${query.toString()}`;
}
function leerFavoritos() {
  const favoritosGuardados = localStorage.getItem(storageKey);
  if (!favoritosGuardados) {
    return [];
  }
  try {
    return JSON.parse(favoritosGuardados);
  } catch (error) {
    return [];
  }
}
function guardarFavoritos(favoritos) {
  localStorage.setItem(storageKey, JSON.stringify(favoritos));
}
function limpiarGatoParaGuardar(gato) {
  return {
    id: gato.id,
    url: gato.url,
    width: gato.width,
    height: gato.height,
    breeds: gato.breeds || []
  };
}
function obtenerRaza(gato) {
  if (gato.breeds && gato.breeds.length > 0) {
    return gato.breeds[0];
  }
  return null;
}
function obtenerTituloGato(gato) {
  const raza = obtenerRaza(gato);
  if (raza) {
    return raza.name;
  }
  return `Gato #${gato.id}`;
}
function obtenerDescripcionGato(gato) {
  const raza = obtenerRaza(gato);
  if (raza) {
    return `${raza.origin} - ${raza.life_span} años`;
  }
  return `${gato.width} x ${gato.height} px`;
}
function obtenerResumenDetalle(gato, raza) {
  if (!raza) {
    return "Esta imagen no tiene una raza identificada en los datos de The Cat API. Aun así, puedes guardarla como favorita para volver a verla cuando quieras.";
  }
  let resumen = `Este gato aparece identificado como ${raza.name}.`;
  if (raza.origin && raza.life_span) {
    resumen += ` La raza procede de ${traducirOrigen(raza.origin)} y suele vivir entre ${raza.life_span} años.`;
  }
  if (raza.temperament) {
    resumen += ` Según los datos de la API, suele tener un carácter ${traducirTemperamento(raza.temperament)}.`;
  }
  return resumen;
}
function traducirOrigen(origen) {
  const origenes = {
    Australia: "Australia",
    Burma: "Birmania",
    Canada: "Canadá",
    China: "China",
    Cyprus: "Chipre",
    Egypt: "Egipto",
    France: "Francia",
    Greece: "Grecia",
    Iran: "Irán",
    "Iran (Persia)": "Irán",
    "Isle of Man": "Isla de Man",
    Japan: "Japón",
    Norway: "Noruega",
    Russia: "Rusia",
    Singapore: "Singapur",
    Somalia: "Somalia",
    Thailand: "Tailandia",
    Turkey: "Turquía",
    "United Kingdom": "Reino Unido",
    "United States": "Estados Unidos"
  };
  return origenes[origen] || origen;
}
function traducirTemperamento(temperamento) {
  const traducciones = {
    Active: "activo",
    Adaptable: "adaptable",
    Adventurous: "aventurero",
    Affectionate: "cariñoso",
    Agile: "ágil",
    Alert: "alerta",
    Bold: "atrevido",
    Calm: "tranquilo",
    Curious: "curioso",
    Demanding: "exigente",
    Dependent: "apegado",
    Docile: "dócil",
    "Easy Going": "relajado",
    Energetic: "enérgico",
    Friendly: "amigable",
    Gentle: "dócil",
    Independent: "independiente",
    Intelligent: "inteligente",
    Interactive: "interactivo",
    Lively: "vivo",
    Loyal: "leal",
    Loving: "afectuoso",
    Mischievous: "travieso",
    Playful: "juguetón",
    Quiet: "tranquilo",
    Relaxed: "relajado",
    Shy: "tímido",
    Social: "sociable",
    Sweet: "dulce",
    Vocal: "vocal",
    Wild: "salvaje"
  };
  return temperamento.split(",").map((item) => item.trim()).map((item) => traducciones[item] || item).join(", ");
}
function FilaDetalle({ titulo, valor }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { children: titulo }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: valor })
  ] });
}
function DetalleGato({ gato, esFavorito, cerrarDetalle }) {
  const raza = obtenerRaza(gato);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cat-detail", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "secondary-button", type: "button", onClick: cerrarDetalle, children: "Cerrar detalle" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "detail-badge", children: raza ? "Raza identificada" : "Sin raza identificada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: raza ? `Ficha de ${raza.name}` : `Ficha del gato #${gato.id}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gato.url, alt: obtenerTituloGato(gato) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "detail-summary", children: obtenerResumenDetalle(gato, raza) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { children: [
        raza ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Raza", valor: raza.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Origen", valor: traducirOrigen(raza.origin) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Vida media", valor: `${raza.life_span} años` }),
          raza.weight && raza.weight.metric && /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Peso aprox.", valor: `${raza.weight.metric} kg` }),
          raza.temperament && /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Carácter", valor: traducirTemperamento(raza.temperament) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Raza", valor: "No identificada en la API" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Datos disponibles", valor: "Imagen, referencia y tamaño" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FilaDetalle,
          {
            titulo: "Favorito",
            valor: esFavorito(gato.id) ? "Guardado en tus favoritos" : "Aún no está guardado"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Tamaño imagen", valor: `${gato.width} x ${gato.height} px` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilaDetalle, { titulo: "Referencia", valor: `#${gato.id}` })
      ] })
    ] })
  ] });
}
function TarjetaGato({ gato, esFavorito, cambiarFavorito, abrirDetalle }) {
  const favoritoActivo = esFavorito(gato.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "cat-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "image-frame", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gato.url, alt: obtenerTituloGato(gato) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cat-card-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: obtenerTituloGato(gato) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: obtenerDescripcionGato(gato) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: favoritoActivo ? "favorite-button is-active" : "favorite-button",
            type: "button",
            onClick: () => cambiarFavorito(gato),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "heart-icon", "aria-hidden": "true", children: favoritoActivo ? "♥" : "♡" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: favoritoActivo ? "Quitar favorito" : "Marcar favorito" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "secondary-button detail-button",
            type: "button",
            onClick: () => abrirDetalle(gato),
            children: "Ver detalle"
          }
        )
      ] })
    ] })
  ] });
}
function Inicio({ esFavorito, cambiarFavorito, abrirDetalle, cerrarDetalle }) {
  const [gatos, setGatos] = reactExports.useState([]);
  const [razas, setRazas] = reactExports.useState([]);
  const [tipoImagen, setTipoImagen] = reactExports.useState("");
  const [razaElegida, setRazaElegida] = reactExports.useState("");
  const [mensajeEstado, setMensajeEstado] = reactExports.useState("Cargando primeros gatos...");
  const [mensajeScroll, setMensajeScroll] = reactExports.useState("Cargando más gatos...");
  const [estadoError, setEstadoError] = reactExports.useState(false);
  const [scrollError, setScrollError] = reactExports.useState(false);
  const [cargando, setCargando] = reactExports.useState(false);
  const [hayMasResultados, setHayMasResultados] = reactExports.useState(true);
  reactExports.useEffect(() => {
    cargarRazas();
  }, []);
  reactExports.useEffect(() => {
    reiniciarGaleria();
  }, [tipoImagen, razaElegida]);
  reactExports.useEffect(() => {
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
    if (cargando || !reiniciar && !hayMasResultados) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Descubre gatos sin parar" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Explora imágenes reales de gatos, filtra por tipo o raza y guarda tus favoritos para volver a ellos cuando quieras." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "image-type", children: "Tipo de imagen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "image-type",
          name: "image-type",
          value: tipoImagen,
          onChange: (event) => setTipoImagen(event.target.value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Todas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "jpg,png", children: "Fotos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gif", children: "GIFs" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "breed-select", children: "Raza" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "breed-select",
          name: "breed-select",
          value: razaElegida,
          onChange: (event) => setRazaElegida(event.target.value),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Todas las razas" }),
            razas.map((raza) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: raza.id, children: raza.name }, raza.id))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "secondary-button", type: "button", onClick: limpiarFiltros, children: "Limpiar filtros" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: estadoError ? "status-message error" : "status-message", children: mensajeEstado }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gallery", children: gatos.map((gato) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TarjetaGato,
      {
        gato,
        esFavorito,
        cambiarFavorito,
        abrirDetalle
      },
      gato.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: scrollError ? "scroll-message error" : "scroll-message", children: mensajeScroll })
  ] });
}
function Favoritos({ favoritos, esFavorito, cambiarFavorito, abrirDetalle, cerrarDetalle }) {
  const [paginaFavoritos, setPaginaFavoritos] = reactExports.useState(0);
  const totalPaginas = Math.ceil(favoritos.length / pageSize);
  const inicioPagina = paginaFavoritos * pageSize;
  const favoritosPagina = favoritos.slice(inicioPagina, inicioPagina + pageSize);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hero hero-simple", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Tus gatos favoritos" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aquí encontrarás los gatos que has guardado para volver a verlos cuando quieras." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "status-message", children: obtenerMensajeFavoritos() }),
    favoritos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "empty-message", children: "Todavía no has guardado ningún favorito." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "gallery", children: favoritosPagina.map((gato) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TarjetaGato,
      {
        gato,
        esFavorito,
        cambiarFavorito,
        abrirDetalle
      },
      gato.id
    )) }),
    totalPaginas > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pagination", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "pagination-link",
          type: "button",
          disabled: paginaFavoritos === 0,
          onClick: paginaAnterior,
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Página ",
        paginaFavoritos + 1,
        " de ",
        totalPaginas
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "pagination-link",
          type: "button",
          disabled: paginaFavoritos >= totalPaginas - 1,
          onClick: paginaSiguiente,
          children: "Siguiente"
        }
      )
    ] })
  ] });
}
function App() {
  const paginaInicial = document.body.getAttribute("data-page") === "favorites" ? "favorites" : "home";
  const [favoritos, setFavoritos] = reactExports.useState(leerFavoritos);
  const [gatoDetalle, setGatoDetalle] = reactExports.useState(null);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { paginaActiva: paginaInicial, totalFavoritos: favoritos.length }),
    paginaInicial === "favorites" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Favoritos,
      {
        favoritos,
        esFavorito,
        cambiarFavorito,
        abrirDetalle: setGatoDetalle,
        cerrarDetalle: () => setGatoDetalle(null)
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Inicio,
      {
        esFavorito,
        cambiarFavorito,
        abrirDetalle: setGatoDetalle,
        cerrarDetalle: () => setGatoDetalle(null)
      }
    ),
    gatoDetalle && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DetalleGato,
      {
        gato: gatoDetalle,
        esFavorito,
        cerrarDetalle: () => setGatoDetalle(null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
clientExports.createRoot(document.getElementById("root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
