
export interface IProviderStats {
  name: string;
  baseUrl: string;
  lang: string[] | string;
  isNSFW: boolean;
  logo: string;
  classPath: string;
  isWorking: boolean;
}

export interface ITitle {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred?: string;
}

export interface IAnimeResult {
  id: string;
  title: ITitle;
  url?: string;
  image?: string;
  cover?: string;
  description?: string;
  status?: MediaStatus;
  rating?: number;
  type?: MediaFormat;
  genres: string[];
  releaseDate?: string;
  [x: string]: unknown; // other fields
}

export interface ISearch<T> {
  currentPage?: number;
  hasNextPage?: boolean;
  totalPages?: number;
  /**
   * total results must include results from all pages
   */
  totalResults?: number;
  results: T[];
}

export interface Trailer {
  id: string;
  site?: string;
  thumbnail?: string;
}

export interface FuzzyDate {
  year?: number;
  month?: number;
  day?: number;
}

export enum MediaFormat {
  TV = 'TV',
  TV_SHORT = 'TV_SHORT',
  MOVIE = 'MOVIE',
  SPECIAL = 'SPECIAL',
  OVA = 'OVA',
  ONA = 'ONA',
  MUSIC = 'MUSIC',
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
  ONE_SHOT = 'ONE_SHOT',
}

export interface IAnimeTypeFilter {
  type: MediaFormat
}

export interface IAnimeInfo extends IAnimeResult {
  malId?: number | string;
  description?: string;
  status?: MediaStatus;
  totalEpisodes?: number;
  subOrDub?: SubOrSub;
  synonyms?: string[];
  /**
   * two letter representation of coutnry: e.g JP for japan
   */
  countryOfOrigin?: string;
  isAdult?: boolean;
  isLicensed?: boolean;
  /**
   * `FALL`, `WINTER`, `SPRING`, `SUMMER`
   */
  season?: string;
  studios?: string[];
  color?: string;
  cover?: string;
  trailer?: Trailer;
  episodes?: IAnimeEpisode[];
  startDate?: FuzzyDate;
  endDate?: FuzzyDate;
  recommendations?: IAnimeResult[];
  relations?: IAnimeResult[];
}

export interface IAnimeEpisode {
  id: string;
  number: number;
  title?: string;
  description?: string;
  isFiller?: boolean;
  url?: string;
  image?: string;
  releaseDate?: string;
  [x: string]: unknown; // other fields
}

export interface IEpisodeServer {
  name: string;
  url: string;
}

export interface IVideo {
  /**
   * The **MAIN URL** of the video provider that should take you to the video
   */
  url: string;
  /**
   * The Quality of the video should include the `p` suffix
   */
  quality?: string;
  /**
   * make sure to set this to `true` if the video is hls
   */
  isM3U8?: boolean;
  /**
   * size of the video in **bytes**
   */
  size?: number;
  [x: string]: unknown; // other fields
}

export enum StreamingServers {
  GogoCDN = 'gogocdn',
  StreamSB = 'streamsb',
  MixDrop = 'mixdrop',
  UpCloud = 'upcloud',
  VidCloud = 'vidcloud',
  StreamTape = 'streamtape',
  VizCloud = 'vizcloud',
  // same as vizcloud
  MyCloud = 'mycloud',
  Filemoon = 'filemoon',
  VidStreaming = 'vidstreaming',
}

export enum MediaStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  HIATUS = 'Hiatus',
  CANCELLED = 'Cancelled',
  NOT_YET_AIRED = 'Not yet aired',
  UNKNOWN = 'Unknown',
}

export enum SubOrSub {
  SUB = 'sub',
  DUB = 'dub',
  BOTH = 'both',
}