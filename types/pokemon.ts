export type Attack = {
  name: string;
  type: string;
  damage: number;
};

export type Pokemon = {
  name: string;
  image: string;
  types: string[];
  attacks?: {
    special: Attack[];
  };
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
