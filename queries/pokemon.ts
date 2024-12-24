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
      number
      name
      types
      image
      attacks {
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
        }
      }
    }
  }
`;

const GET_ALL_POKEMON = gql`
  query getAllPokemon {
    pokemons(first: 151) {
      id
      name
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

export async function fetchAllPokemon() {
  try {
    const { data } = await apolloClient.query({
      query: GET_ALL_POKEMON,
    });
    return data.pokemons;
  } catch (error) {
    console.error("Error fetching all Pokemon:", error);
    throw error;
  }
}
