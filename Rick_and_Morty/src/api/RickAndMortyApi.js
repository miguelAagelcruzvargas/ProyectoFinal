const getCharacters = async (search, status, species, type, gender, page = 1) => {
  let url = `https://rickandmortyapi.com/api/character/?name=${search}&page=${page}`;

  if (status !== "all") url += `&status=${status}`;
  if (species !== "all") url += `&species=${species}`;
  if (type !== "all") url += `&type=${type}`;
  if (gender !== "all") url += `&gender=${gender}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
// Función para obtener un personaje específico por ID de la API de Rick and Morty
const getCharacterById = async (id) => {
  // Construye la URL de la API utilizando el ID del personaje
  //LLMADA 2
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  // Realiza una petición HTTP a la URL construida
  const response = await fetch(url);

  // Convierte la respuesta a formato JSON
  const data = await response.json();

  // Devuelve los datos del personaje específico obtenido de la API
  return data;
};

// Función para obtener episodios de una lista de URLs de episodios
//LLMADA 3
const getEpisodes = async (urls) => {
  // Mapea las URLs de los episodios y realiza una petición HTTP para cada una,
  // luego convierte cada respuesta a formato JSON
  const promises = urls.map((url) =>
    fetch(url).then((response) => response.json())
  );

  // Espera a que todas las promesas se resuelvan y devuelve los datos de los episodios
  return Promise.all(promises);
};

// Exporta las funciones para que puedan ser utilizadas en otros módulos
export { getCharacters, getCharacterById, getEpisodes };
