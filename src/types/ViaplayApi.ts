export interface ViaplaySeriesPage {
  type: string
  pageType: string
  sectionId: string
  title: string
  description: string
  styles: string[]
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: Links
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _embedded: EmbeddedBlocks
  responseCode: ResponseCode
}

export interface ResponseCode {
  httpStatus: number
  statusCode: number
  code: number
}

export interface EmbeddedBlocks {
  "viaplay:blocks": ViaplayBlock[]
}

export interface ViaplayBlock {
  ablocator: string
  id: string
  type: string
  client: Client
  styles: string[]
  title: string
  totalProductCount: number
  currentPage: number
  pageCount: number
  productsPerPage: number
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _embedded: EmbeddedProducts
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: BlockLinkedListLinks
}

export interface BlockLinkedListLinks {
  self: Pick<Self, "href">
  next: ViaplaypeopleSearch
  first: Pick<Self, "href">
  last: Pick<Self, "href">
}

export interface EmbeddedProducts {
  "viaplay:products": ViaplayProducts[]
}

export interface ViaplayProducts {
  type: string
  publicPath: string
  content: Content
  user: User
  system: System
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: PageLinks
  notice: Notice
}

export interface Notice {
  message: string
  code: number
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _links: AccountLinks
}

export interface AccountLinks {
  curies: Cury[]
  "viaplay:accountPurchasePackage": ViaplayAccountPurchasePackage
}

export interface ViaplayAccountPurchasePackage {
  href: string
  templated: boolean
  redirect: boolean
}

export interface PageLinks {
  self: Self
  "viaplay:page": Self
  "viaplay:templatedPage": Self
  "viaplay:genres": ViaplayGenre[]
  "viaplay:peopleSearch": ViaplaypeopleSearch
  "viaplay:trailerStream"?: ViaplaypeopleSearch
  "viaplay:trailerSelf"?: Self
}

export interface ViaplaypeopleSearch {
  href: string
  templated: boolean
}

export interface ViaplayGenre {
  title: string
  tagId: string
  href: string
}

export interface System {
  availability: Availability
  flags: string[]
  guid: string
  isKids: boolean
}

export interface Availability {
  start: string
  end: string
  planInfo: PlanInfo
  svod: Svod2
}

export interface Svod2 {
  start: string
  end: string
  planInfo: PlanInfo
}

export interface PlanInfo {
  isRental: boolean
  isPurchase: boolean
}

export interface User {
  starred: boolean
}

export interface Content {
  images: Images
  people: People
  parentalRating: string
  series: Series
  synopsis: string
  imdb?: Imdb
  production: Production
  originalTitle?: string
}

export interface Production {
  year: number
}

export interface Imdb {
  id: string
  rating: string
  votes: string
  url: string
}

export interface Series {
  title: string
  synopsis: string
  season: Season
  seasons: number
  seriesGuid: string
}

export interface Season {
  title: string
  availability: Pick<Availability, "svod">
}

export interface Svod {
  start: string
  end: string
}

export interface People {
  actors?: string[]
  directors?: string[]
  participants?: string[]
}

export interface Images {
  boxart: Boxart
  landscape: Boxart
  hero169: Hero
  coverart23: Hero
  coverart169: Hero
  coverart11?: Hero
}

export interface Hero {
  template: string
}

export interface Boxart {
  url: string
  template: string
}

export interface Client {
  styles: string
  autoAppend: boolean
  module: string
  template: string
}

export interface Links {
  curies: Cury[]
  self: Pick<Self, "href">
  "viaplay:root": ViaplayRoot
  "viaplay:editorial": ViaplayEditorial
  "viaplay:socket": ViaplayEditorial
  "viaplay:socket2": ViaplayEditorial
  "viaplay:search": ViaplaySearch
  "viaplay:autocomplete": ViaplaySearch
  "viaplay:byGuid": ViaplaySearch
  "viaplay:searchSuggestions": ViaplaySearch
  "viaplay:validateSession": ViaplayValidateSession
  "viaplay:translations": ViaplayValidateSession
  "viaplay:technotifier": ViaplayEditorial
  "viaplay:sections": ViaplaySection[]
  "viaplay:geolocation": Pick<Self, "href">
  "viaplay:retrieveUserInformation": ViaplayRetrieveUserInformation
  "viaplay:localizationLanguages": ViaplayLocalizationLanguages
  "viaplay:localizationCountry": ViaplayRetrieveUserInformation
  "viaplay:userJourneyGetJourney": ViaplayRetrieveUserInformation
  "viaplay:login": ViaplaySearch
  "viaplay:facebookLogin": ViaplaySearch
  "viaplay:tokenLogin": ViaplayTokenLogin
  "viaplay:tokenRefresh": ViaplayTokenLogin
  "viaplay:setParentalControl": ViaplayRetrieveUserInformation
  "viaplay:userPwdUpdate": ViaplayRetrieveUserInformation
  "viaplay:userPwdLoginRequest": ViaplayRetrieveUserInformation
  "viaplay:passwordToken": ViaplayRetrieveUserInformation
  "viaplay:resetPassword": ViaplayLocalizationLanguages
  "viaplay:retrieveUserEmail": ViaplayRetrieveUserInformation
  "viaplay:universalLinkResolver": ViaplayRetrieveUserInformation
  "viaplay:userExperiments": ViaplayRetrieveUserInformation
  "viaplay:tracking": ViaplayRetrieveUserInformation
  "viaplay:categoryFilters": ViaplayCategoryFilter[]
  "viaplay:sortings": ViaplaySorting[]
}

export interface ViaplaySorting {
  id: string
  title: string
  href: string
  active?: boolean
}

export interface ViaplayCategoryFilter {
  title: string
  href: string
  templated: boolean
  tagId: string
  type: string
  active?: boolean
  group?: Group
  categoryType?: string
}

export interface Group {
  title: string
  position: number
}

export interface ViaplayTokenLogin {
  href: string
  method: string
  templated: boolean
}

export interface ViaplayLocalizationLanguages {
  id: string
  href: string
  method: string
}

export interface ViaplayRetrieveUserInformation {
  id: string
  href: string
  method: string
  templated: boolean
}

export interface ViaplaySection {
  id: string
  title: string
  href: string
  type: string
  name: string
  active?: boolean
}

export interface ViaplayValidateSession {
  id: string
  href: string
  templated: boolean
}

export interface ViaplaySearch {
  title: string
  href: string
  templated: boolean
}

export interface ViaplayEditorial {
  id: string
  href: string
}

export interface ViaplayRoot {
  id: string
  title: string
  href: string
}

export interface Self {
  title: string
  href: string
}

export interface Cury {
  name: string
  href: string
  templated: boolean
}
