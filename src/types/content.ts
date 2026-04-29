export type Cta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type Character = {
  name: string;
  faction: string;
  motivation: string;
  image: string;
};

export type UniverseItem = {
  title: string;
  description: string;
  image: string;
};

export type Quote = string;
