/** A rows-per-page choice: a positive number of rows, or `'all'` for every row. */
export type CxsDataTablePageSize = number | 'all';

/** Prefix of the browser storage entry that holds a table's rows-per-page choice. */
export const CXS_DATA_TABLE_PAGE_SIZE_STORAGE_PREFIX = 'cxs-data-table:page-size:';

/**
 * Reads the rows-per-page choice saved under `key`.
 * Returns `fallback` when nothing is saved, the saved value is not one of `options`,
 * or browser storage is unavailable.
 */
export function readCxsDataTablePageSize(
  key: string,
  options: readonly CxsDataTablePageSize[],
  fallback: CxsDataTablePageSize
): CxsDataTablePageSize {
  try {
    const raw = getLocalStorage()?.getItem(CXS_DATA_TABLE_PAGE_SIZE_STORAGE_PREFIX + key);
    if (raw === null || raw === undefined) {
      return fallback;
    }

    const parsed: CxsDataTablePageSize = raw === 'all' ? 'all' : Number(raw);
    return options.includes(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/** Saves the rows-per-page choice under `key`. Storage failures are ignored. */
export function writeCxsDataTablePageSize(key: string, size: CxsDataTablePageSize): void {
  try {
    getLocalStorage()?.setItem(CXS_DATA_TABLE_PAGE_SIZE_STORAGE_PREFIX + key, String(size));
  } catch {
    // Storage can be blocked or full; the table still works without remembering.
  }
}

function getLocalStorage(): Storage | null {
  return typeof localStorage === 'undefined' ? null : localStorage;
}
