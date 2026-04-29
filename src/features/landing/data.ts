import type { Character, Cta, UniverseItem } from "@/types/content";

export const heroActions: Cta[] = [
  { label: "Assistir trailer", href: "#trailer", variant: "primary" },
  { label: "Explorar universo", href: "#universo", variant: "secondary" }
];

export const synopsis =
  "Paul Atreides se une aos Fremen e à sua amada Chani em uma jornada épica de vingança contra aqueles que destruíram sua família. Entre visões devastadoras e escolhas impossíveis, ele enfrenta um destino que pode salvar ou destruir o universo conhecido. A batalha por Arrakis começa — e apenas a areia sabe como termina.";

export const characters: Character[] = [
  {
    name: "Paul Atreides",
    faction: "Casa Atreides · Muad'Dib",
    motivation:
      "Cumprir seu destino como Kwisatz Haderach e libertar Arrakis da opressão.",
    image: "/characters/paul-atreides.jpg"
  },
  {
    name: "Lady Jessica",
    faction: "Bene Gesserit · Casa Atreides",
    motivation:
      "Proteger o filho e manipular a fé Fremen para garantir a sobrevivência da Casa.",
    image: "/characters/lady-jessica.jpg"
  },
  {
    name: "Feyd-Rautha",
    faction: "Casa Harkonnen",
    motivation:
      "Conquistar Arrakis pela brutalidade e se tornar o novo governante do universo.",
    image: "/characters/feyd-rautha.jpg"
  },
  {
    name: "Stilgar",
    faction: "Fremen",
    motivation:
      "Defender Arrakis e unir seu povo sob a bandeira do profeta Muad'Dib.",
    image: "/characters/stilgar.jpg"
  },
  {
    name: "Chani",
    faction: "Fremen",
    motivation:
      "Proteger Arrakis e questionar o poder de uma profecia que ela nunca escolheu.",
    image: "/characters/chani.jpg"
  },
  {
    name: "Princesa Irulan",
    faction: "Casa Imperial",
    motivation:
      "Navegar nas intrigas políticas e garantir o futuro do Império sob pressão.",
    image: "/characters/princesa-irulan.jpg"
  }
];

export const universeItems: UniverseItem[] = [
  {
    title: "Arrakis",
    description:
      "Planeta desértico e única fonte da especiaria Melange. Cada grão de areia esconde um segredo que pode mudar o destino da galáxia.",
    image: "/universe/planeta-arrakis.jpg"
  },
  {
    title: "Melange",
    description:
      "A substância mais valiosa do universo. Confere habilidades psíquicas, prolonga a vida e é essencial para a navegação entre estrelas.",
    image: "/universe/melange.jpg"
  },
  {
    title: "Fremen",
    description:
      "Povo do deserto que transforma escassez em disciplina, fé e resistência. Guardiões do tempero e da verdade de Arrakis.",
    image: "/universe/povo-fremen.jpg"
  },
  {
    title: "Casas Nobres",
    description:
      "Atreides e Harkonnen travam uma guerra de estratégia, traição e sangue pelo controle do comércio de Melange e do trono imperial.",
    image: "/universe/casas-nobres.jpg"
  }
];

export const galleryImages: string[] = [
  "/gallery/poster-dune.jpg",
  "/gallery/galera1.jpg",
  "/gallery/galeria2.jpg",
  "/gallery/galeria4.jpg",
  "/gallery/galeria5.jpg",
  "/gallery/galeria6.jpg",
  "/gallery/galeria7.png",
  "/gallery/galeria8.jpg",
  "/gallery/galeria9.jpg",
  "/gallery/galeria10.jpg",
  "/gallery/galeria11.jpg",
  "/gallery/galeria12.jpg"
];

export const quotes: string[] = [
  "O destino não é uma questão de sorte — é uma questão de escolha.",
  "A repressão só faz a religião florescer.",
  "A areia guarda segredos que podem mudar o universo.",
  "Você subestima o poder da fé."
];

export const marqueeText =
  "PAUL ATREIDES · ARRAKIS · MELANGE · FREMEN · MUAD'DIB · CASA ATREIDES · HARKONNEN · ";
