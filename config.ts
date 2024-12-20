export const API_URL_WIKI = "https://en.wikipedia.org/w/api.php";

export const getWikipediaApiUrl = (pokemonName: string) => {
  return `${API_URL_WIKI}?action=query&format=json&prop=extracts&exintro&titles=${pokemonName}_(Pok%C3%A9mon)&origin=*`;
};
