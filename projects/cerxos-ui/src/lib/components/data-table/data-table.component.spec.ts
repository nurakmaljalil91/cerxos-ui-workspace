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
