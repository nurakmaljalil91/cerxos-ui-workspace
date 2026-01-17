import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsTableColumn, CxsTableComponent } from './table.component';

describe('CxsTableComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsTableComponent],
    template: `
      <cxs-table [columns]="columns" [data]="data"></cxs-table>
    `
  })
  class TestHostComponent {
    columns: CxsTableColumn[] = [
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status' }
    ];
    data = [
      { name: 'Alpha', status: 'Active' },
      { name: 'Beta', status: 'Paused' }
    ];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders header labels', () => {
    const headers = fixture.nativeElement.querySelectorAll('th') as NodeListOf<HTMLTableCellElement>;
    expect(headers.length).toBe(2);
    expect(headers[0].textContent?.trim()).toBe('Name');
    expect(headers[1].textContent?.trim()).toBe('Status');
  });

  it('renders data rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr') as NodeListOf<HTMLTableRowElement>;
    expect(rows.length).toBe(2);
    expect(rows[0].textContent?.replace(/\s+/g, ' ').trim()).toContain('Alpha');
    expect(rows[1].textContent?.replace(/\s+/g, ' ').trim()).toContain('Beta');
  });

  it('renders empty state when data is empty', () => {
    const host = fixture.componentInstance;
    host.data = [];
    fixture.detectChanges();

    const emptyCell = fixture.nativeElement.querySelector('tbody td') as HTMLTableCellElement;
    expect(emptyCell.textContent?.trim()).toBe('No data available');
  });
});
