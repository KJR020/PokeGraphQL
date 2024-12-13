import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://graphql-pokemon2.vercel.app/",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types
      image
    }
  }
`;

export async function fetchPokemon(name: string) {
  try {
    const { data } = await apolloClient.query({
      query: GET_POKEMON,
      variables: { name },
    });
    return data.pokemon;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
}
