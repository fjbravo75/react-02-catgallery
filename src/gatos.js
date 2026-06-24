export const apiBaseUrl = "https://api.thecatapi.com/v1";
export const storageKey = "catgallery_react_favorites";
export const pageSize = 9;

export function crearUrl(path, params) {
  const query = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (params[key] !== "") {
      query.append(key, params[key]);
    }
  });

  return `${apiBaseUrl}${path}?${query.toString()}`;
}

export function leerFavoritos() {
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

export function guardarFavoritos(favoritos) {
  localStorage.setItem(storageKey, JSON.stringify(favoritos));
}

export function limpiarGatoParaGuardar(gato) {
  return {
    id: gato.id,
    url: gato.url,
    width: gato.width,
    height: gato.height,
    breeds: gato.breeds || []
  };
}

export function obtenerRaza(gato) {
  if (gato.breeds && gato.breeds.length > 0) {
    return gato.breeds[0];
  }

  return null;
}

export function obtenerTituloGato(gato) {
  const raza = obtenerRaza(gato);

  if (raza) {
    return raza.name;
  }

  return `Gato #${gato.id}`;
}

export function obtenerDescripcionGato(gato) {
  const raza = obtenerRaza(gato);

  if (raza) {
    return `${raza.origin} - ${raza.life_span} años`;
  }

  return `${gato.width} x ${gato.height} px`;
}

export function obtenerResumenDetalle(gato, raza) {
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

export function traducirOrigen(origen) {
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

export function traducirTemperamento(temperamento) {
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

  return temperamento
    .split(",")
    .map((item) => item.trim())
    .map((item) => traducciones[item] || item)
    .join(", ");
}
