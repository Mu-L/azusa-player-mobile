export { SyncOptions } from './Sync';

export enum StorageKeys {
  PLAYER_SETTING_KEY = 'PlayerSetting',
  FAVORITE_PLAYLIST_KEY = 'FavFavList-Special',
  SEARCH_PLAYLIST_KEY = 'SearchPlaylist-Special',
  LAST_PLAY_LIST = 'LastPlayList',
  FAVLIST_AUTO_UPDATE_TIMESTAMP = 'favListAutoUpdateTimestamp',
  MY_FAV_LIST_KEY = 'MyFavList',
  PLAYMODE_KEY = 'Playmode',
  SKIN = 'PlayerSkin',
  SKINSTORAGE = 'PlayerSkinStorage',
  COOKIES = 'Cookies',
  LYRIC_MAPPING = 'NewLyricMapping',
  LAST_PLAY_DURATION = 'LastPlayDuration',
  CACHED_MEDIA_MAPPING = 'CachedMediaMapping',
  DEFAULT_SEARCH = 'defaultSearch',
  R128GAIN_MAPPING = 'R128GainMapping',
  ABREPEAT_MAPPING = 'ABREPEATMapping',
  FADE_INTERVAL = 'fadeInterval',
  COLORTHEME = 'ColorTheme',
  REGEXTRACT_MAPPING = 'RegexExtract',
  AA_PERMISSION = 'AndroidAutoPermission',
  TANAKA_AMAZING_COMMODITIES = 'TanakaAmazingCommodities',
  ALIST_CRED = 'AlistCred',
  MFSDK_PATHS = 'MusicFreePaths',

  YTMTOKEN = 'YTMToken',
  YTMCOOKIES = 'YTMCookies',
  EXPO_SQL_MIGRATION = 'ExpoSqlMigration',
  SQL_PLACEHOLDER = 'SQLPlaceholder',
}

export const StoragePlaceholders = [StorageKeys.SQL_PLACEHOLDER];

export enum SearchOptions {
  BILIBILI = 'bilibili',
  YOUTUBE = 'youtube',
  YOUTUBEM = 'yt music',
  ALIST = 'alist',
  MUSICFREE = 'musicfree',
}
