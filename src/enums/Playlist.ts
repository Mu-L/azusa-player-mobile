export enum PlaylistTypes {
  Typical = 'typical',
  Search = 'search',
  Favorite = 'favorite',
}

export const SearchRegex: { [key: string]: { regex: RegExp; text: string } } = {
  absoluteMatch: { regex: /Parsed:(.+)/, text: 'Parsed:' },
  artistMatch: { regex: /Artist:(.+)/, text: 'Artist:' },
  albumMatch: { regex: /Album:(.+)/, text: 'Album:' },
  cachedMatch: { regex: /Cached:(.*)/, text: 'Cached:' },
  durationLessMatch: { regex: /Duration<:(\d+)/, text: 'Duration<:' },
  durationMoreMatch: { regex: /Duration>:(\d+)/, text: 'Duration>:' },
  // regexMatch: { regex: /Regex:(.*)/, text: 'Regex:' },
};

export enum SortOptions {
  Title = 'TITLE',
  Artist = 'ARTIST',
  Album = 'ALBUM',
  Date = 'DATE',
  LastPlayed = 'LAST_PLAYED',
  PlayCount = 'PLAY_COUNT',
  PreviousOrder = 'PREVIOUS_ORDER',
  AsIs = 'AS_IS',
}

export const PlaylistMediaID = 'playlist-';

export const YTMChartMediaID = 'ytmchart-';
