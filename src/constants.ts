import {
  Boxart,
  Series,
  Content,
  Hero,
  Images,
  People,
  ViaplayCategoryTitle,
} from "types/ViaplayApi"

// Maybe these could be part of Environmental Variables, but to simplify I'm adding them here
export const API_URL = "https://content.viaplay.se/pc-se/serier"
export const SITE_URL = "http://localhost:3000"
export const ITEMS_PER_PAGE = 10
export const CATEGORIES: ViaplayCategoryTitle[] = [
  "samtliga",
  "action",
  "animation",
  "barnserier",
  "dokumentarserier",
  "drama",
  "komedi",
  "kriminaldrama",
  "livsstil",
  "matlagning",
  "reality",
  "science-fiction",
  "sportdokumentarer",
  "sportmagasin",
  "thriller",
  "true-crime",
  "underhallning",
  "ungdomsserier",
  "alla-sasonger",
  "abc-studios",
  "chicago-serierna",
  "fox",
  "internationella-serier",
  "national-geographic",
  "starzplay",
  "viaplay-originals",
]

export const EMPTY_HERO_IMAGE: Hero = {
  template: "",
}
export const EMPTY_BOX_IMAGE: Boxart = {
  url: "https://i.postimg.cc/CMR29xDT/VIAPLAY.png",
  template: "",
}

export const EMPTY_SERIES_IMAGES: Images = {
  boxart: EMPTY_BOX_IMAGE,
  landscape: EMPTY_BOX_IMAGE,
  hero169: EMPTY_HERO_IMAGE,
  coverart169: EMPTY_HERO_IMAGE,
  coverart23: EMPTY_HERO_IMAGE,
}

export const EMPTY_SERIES_PEOPLE: People = {
  actors: [],
  directors: [],
  participants: [],
}

export const EMPTY_SERIES_SERIES: Series = {
  title: "",
  synopsis: "",
  season: {
    title: "",
    availability: {
      svod: {
        start: "",
        end: "",
        planInfo: {
          isRental: false,
          isPurchase: false,
        },
      },
    },
  },
  seasons: -1,
  seriesGuid: "",
}

export const EMPTY_SERIE_CARD: Content = {
  images: EMPTY_SERIES_IMAGES,
  people: EMPTY_SERIES_PEOPLE,
  parentalRating: "",
  series: EMPTY_SERIES_SERIES,
  synopsis: "",
  production: {
    year: -1,
  },
}
