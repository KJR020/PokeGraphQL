export type Pokemon = {
  name: string;
  image: string;
  types: string[];
  attacks?: string[];
};

export type WikipediaPage = {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
};

export type WikipediaResponse = {
  query: {
    pages: {
      [key: string]: WikipediaPage;
    };
  };
};
