import {
  CXS_DATA_TABLE_PAGE_SIZE_STORAGE_PREFIX,
  readCxsDataTablePageSize,
  writeCxsDataTablePageSize
} from './data-table-page-size-storage';

describe('data table page size storage', () => {
  const options = [10, 50, 100, 'all'] as const;

  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('round-trips a numeric size', () => {
    writeCxsDataTablePageSize('orders', 50);

    expect(localStorage.getItem(CXS_DATA_TABLE_PAGE_SIZE_STORAGE_PREFIX + 'orders')).toBe('50');
    expect(readCxsDataTablePageSize('orders', options, 10)).toBe(50);
  });

  it('round-trips all', () => {
    writeCxsDataTablePageSize('orders', 'all');

    expect(readCxsDataTablePageSize('orders', options, 10)).toBe('all');
  });

  it('returns the fallback when nothing is saved', () => {
    expect(readCxsDataTablePageSize('orders', options, 10)).toBe(10);
  });

  it('ignores a saved value that is not an option', () => {
    localStorage.setItem(CXS_DATA_TABLE_PAGE_SIZE_STORAGE_PREFIX + 'orders', '20');

    expect(readCxsDataTablePageSize('orders', options, 10)).toBe(10);
  });

  it('keeps keys independent', () => {
    writeCxsDataTablePageSize('orders', 'all');

    expect(readCxsDataTablePageSize('invoices', options, 10)).toBe(10);
  });

  it('falls back when storage throws', () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('blocked');
    spyOn(Storage.prototype, 'setItem').and.throwError('blocked');

    expect(() => writeCxsDataTablePageSize('orders', 50)).not.toThrow();
    expect(readCxsDataTablePageSize('orders', options, 10)).toBe(10);
  });
});
