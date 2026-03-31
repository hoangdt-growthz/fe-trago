export type SearchHistoryItem = {
  id: string;
  query: string;
  timestamp: string;
};

const SAVED_KEY = "trago:saved-place-ids";
const VIEWED_KEY = "trago:view-place-ids";
const SEARCH_KEY = "trago:search-history";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedPlaceIds() {
  return readJson<string[]>(SAVED_KEY, []);
}

export function setSavedPlaceIds(ids: string[]) {
  writeJson(SAVED_KEY, ids);
}

export function toggleSavedPlace(id: string) {
  const current = getSavedPlaceIds();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [id, ...current];
  setSavedPlaceIds(next);
  return next;
}

export function isPlaceSaved(id: string) {
  return getSavedPlaceIds().includes(id);
}

export function getViewedPlaceIds() {
  return readJson<string[]>(VIEWED_KEY, []);
}

export function recordViewedPlace(id: string) {
  const current = getViewedPlaceIds().filter((item) => item !== id);
  writeJson(VIEWED_KEY, [id, ...current].slice(0, 12));
}

export function getSearchHistory() {
  return readJson<SearchHistoryItem[]>(SEARCH_KEY, []);
}

export function addSearchHistory(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return getSearchHistory();

  const current = getSearchHistory().filter((item) => item.query.toLowerCase() !== trimmed.toLowerCase());
  const next = [
    {
      id: `${Date.now()}`,
      query: trimmed,
      timestamp: new Intl.DateTimeFormat("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit"
      }).format(new Date())
    },
    ...current
  ].slice(0, 12);

  writeJson(SEARCH_KEY, next);
  return next;
}

export function removeSearchHistory(id: string) {
  const next = getSearchHistory().filter((item) => item.id !== id);
  writeJson(SEARCH_KEY, next);
  return next;
}

export function clearSearchHistory() {
  writeJson(SEARCH_KEY, []);
}
