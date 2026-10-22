import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsDataTableColumn, CxsDataTableComponent } from './data-table.component';

describe('CxsDataTableComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsDataTableComponent],
    template: `
      <cxs-data-table
        [columns]="columns"
        [data]="data"
        [pageSize]="pageSize"
        [showToolbar]="false"
        [showFilters]="false"
        [showColumnVisibility]="false"
        [showGlobalSearch]="false"
      ></cxs-data-table>
    `
  })
  class TestHostComponent {
    columns: CxsDataTableColumn[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'status', label: 'Status' }
    ];
    data = [
      { name: 'Beta', status: 'Paused' },
      { name: 'Alpha', status: 'Active' },
      { name: 'Gamma', status: 'Active' }
    ];
    pageSize = 2;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders sortable header button', () => {
    const button = fixture.nativeElement.querySelector('th button') as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Name');
  });

  it('sorts rows when clicking sortable header', () => {
    const button = fixture.nativeElement.querySelector('th button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    const firstRow = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;
    expect(firstRow.textContent).toContain('Alpha');
  });

  it('paginates rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr') as NodeListOf<HTMLTableRowElement>;
    expect(rows.length).toBe(2);

    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    const nextButton = Array.from(buttons).find((button) => button.textContent?.includes('Next'));
    nextButton?.click();
    fixture.detectChanges();

    const pagedRows = fixture.nativeElement.querySelectorAll('tbody tr') as NodeListOf<HTMLTableRowElement>;
    expect(pagedRows.length).toBe(1);
    expect(pagedRows[0].textContent).toContain('Gamma');
  });

  it('shows empty state when no rows', () => {
    host.data = [];
    fixture.detectChanges();

    const emptyCell = fixture.nativeElement.querySelector('tbody td') as HTMLTableCellElement;
    expect(emptyCell.textContent?.trim()).toBe('No data available');
  });
});

describe('CxsDataTableComponent layout and page size', () => {
  let fixture: ComponentFixture<PageSizeHostComponent>;
  let host: PageSizeHostComponent;

  @Component({
    selector: 'cxs-page-size-host',
    standalone: true,
    imports: [CxsDataTableComponent],
    template: `
      <cxs-data-table
        [columns]="columns"
        [data]="data"
        [pageSize]="pageSize"
        [pageIndex]="pageIndex"
        [pageSizeOptions]="pageSizeOptions"
        [pageSizeStorageKey]="storageKey"
        [manualPagination]="manual"
        [total]="total"
        [showFilters]="false"
        [showGlobalSearch]="false"
        (pageChange)="events.push('page:' + $event)"
        (pageSizeChange)="events.push('size:' + $event)"
      ></cxs-data-table>
    `
  })
  class PageSizeHostComponent {
    columns: CxsDataTableColumn[] = [
      { key: 'name', label: 'Name' },
      { key: 'amount', label: 'Amount', align: 'right' }
    ];
    data = Array.from({ length: 37 }, (_, index) => ({ id: index + 1, name: `Row ${index + 1}`, amount: index }));
    pageSize = 10;
    pageIndex = 1;
    pageSizeOptions: Array<number | 'all'> = [10, 50, 100, 'all'];
    storageKey?: string;
    manual = false;
    total?: number;
    events: string[] = [];
  }

  const create = (setup?: (host: PageSizeHostComponent) => void) => {
    fixture = TestBed.createComponent(PageSizeHostComponent);
    host = fixture.componentInstance;
    setup?.(host);
    fixture.detectChanges();
  };

  const select = (): HTMLSelectElement => fixture.nativeElement.querySelector('select') as HTMLSelectElement;

  const choose = (value: string) => {
    select().value = value;
    select().dispatchEvent(new Event('change'));
    fixture.detectChanges();
  };

  const bodyRows = (): NodeListOf<HTMLTableRowElement> => fixture.nativeElement.querySelectorAll('tbody tr');

  const pageText = (): string => fixture.nativeElement.textContent as string;

  const nextButton = (): HTMLButtonElement =>
    Array.from(fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>).find((button) =>
      button.textContent?.includes('Next')
    ) as HTMLButtonElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [PageSizeHostComponent] }).compileComponents();
  });

  afterEach(() => localStorage.clear());

  it('vertically centers body cells and keeps column alignment', () => {
    create();

    const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td') as NodeListOf<HTMLTableCellElement>;
    expect(cells[0].classList).toContain('align-middle');
    expect(cells[0].classList).not.toContain('align-top');
    expect(cells[1].classList).toContain('align-middle');
    expect(cells[1].classList).toContain('text-right');
  });

  it('offers an All option', () => {
    create();

    const labels = Array.from(select().options).map((option) => option.textContent?.trim());
    expect(labels).toEqual(['10', '50', '100', 'All']);
  });

  it('shows every row on one page when All is chosen in client mode', () => {
    create();

    choose('all');

    expect(bodyRows().length).toBe(37);
    expect(pageText()).toContain('Page 1 of 1');
    expect(nextButton().disabled).toBeTrue();
  });

  it('emits size 0 then page 1 when All is chosen in server mode', () => {
    create((h) => {
      h.manual = true;
      h.total = 120;
      h.data = h.data.slice(0, 10);
    });

    choose('all');

    expect(host.events).toEqual(['size:0', 'page:1']);
    expect(pageText()).toContain('Page 1 of 1');
    expect(nextButton().disabled).toBeTrue();
  });

  it('treats a bound page size of 0 as all', () => {
    create((h) => (h.pageSize = 0));

    expect(select().value).toBe('all');
    expect(bodyRows().length).toBe(37);
  });

  it('returns to page 1 when the size changes from a later page', () => {
    create((h) => (h.pageIndex = 3));
    expect(pageText()).toContain('Page 3 of 4');

    choose('50');

    expect(host.events).toEqual(['size:50', 'page:1']);
    expect(pageText()).toContain('Page 1 of 1');
  });

  it('restores and saves the size when a storage key is given', () => {
    localStorage.setItem('cxs-data-table:page-size:orders', '50');
    create((h) => (h.storageKey = 'orders'));

    expect(select().value).toBe('50');
    expect(bodyRows().length).toBe(37);

    choose('all');

    expect(localStorage.getItem('cxs-data-table:page-size:orders')).toBe('all');
  });

  it('ignores a saved size that is not an option', () => {
    localStorage.setItem('cxs-data-table:page-size:orders', '20');
    create((h) => (h.storageKey = 'orders'));

    expect(select().value).toBe('10');
  });

  it('does not touch storage without a key', () => {
    const getItem = spyOn(Storage.prototype, 'getItem').and.callThrough();
    const setItem = spyOn(Storage.prototype, 'setItem').and.callThrough();
    create();

    choose('50');

    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });

  it('works when storage throws', () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('blocked');
    spyOn(Storage.prototype, 'setItem').and.throwError('blocked');
    create((h) => (h.storageKey = 'orders'));

    choose('50');

    expect(select().value).toBe('50');
    expect(host.events).toEqual(['size:50', 'page:1']);
  });
});

describe('CxsDataTableComponent columns panel', () => {
  let fixture: ComponentFixture<ColumnsPanelHostComponent>;

  @Component({
    selector: 'cxs-columns-panel-host',
    standalone: true,
    imports: [CxsDataTableComponent],
    template: `
      <button type="button" id="outside">Outside</button>
      <cxs-data-table [columns]="columns" [data]="data" [showFilters]="false"></cxs-data-table>
    `
  })
  class ColumnsPanelHostComponent {
    columns: CxsDataTableColumn[] = [
      { key: 'name', label: 'Name', pinned: 'left' },
      { key: 'status', label: 'Status' }
    ];
    data = [{ id: 1, name: 'Alpha', status: 'Active' }];
  }

  const details = (): HTMLDetailsElement => fixture.nativeElement.querySelector('details') as HTMLDetailsElement;
  const summary = (): HTMLElement => fixture.nativeElement.querySelector('summary') as HTMLElement;

  const open = () => {
    details().open = true;
    details().dispatchEvent(new Event('toggle'));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ColumnsPanelHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(ColumnsPanelHostComponent);
    fixture.detectChanges();
  });

  it('stacks the panel above the table', () => {
    const panel = details().querySelector('div') as HTMLDivElement;
    expect(panel.classList).toContain('z-40');
  });

  it('closes on an outside click', () => {
    open();

    (fixture.nativeElement.querySelector('#outside') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(details().open).toBeFalse();
  });

  it('closes on Escape and focuses the Columns button', () => {
    open();
    const checkbox = details().querySelector('input') as HTMLInputElement;
    checkbox.focus();

    checkbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(details().open).toBeFalse();
    expect(document.activeElement).toBe(summary());
  });

  it('stays open when a column is toggled', () => {
    open();
    const checkbox = details().querySelector('input') as HTMLInputElement;

    checkbox.click();
    fixture.detectChanges();

    expect(details().open).toBeTrue();
    const headers = fixture.nativeElement.querySelectorAll('thead th') as NodeListOf<HTMLTableCellElement>;
    expect(headers.length).toBe(1);
  });
});
