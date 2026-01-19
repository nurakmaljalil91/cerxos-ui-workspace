import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsActionMenuComponent, CxsActionMenuItem } from './action-menu.component';

describe('CxsActionMenuComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsActionMenuComponent],
    template: `
      <cxs-action-menu [items]="items" (itemSelected)="onSelected($event)"></cxs-action-menu>
    `
  })
  class TestHostComponent {
    items: CxsActionMenuItem[] = [
      { label: 'Edit user', value: 'edit-user' },
      { label: 'Delete user', value: 'delete-user', tone: 'danger' }
    ];
    selected?: CxsActionMenuItem;

    onSelected(item: CxsActionMenuItem): void {
      this.selected = item;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders menu items when opened', () => {
    const trigger = fixture.nativeElement.querySelector('button[aria-haspopup="menu"]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLButtonElement>;
    expect(items.length).toBe(2);
    expect(items[0].textContent?.trim()).toBe('Edit user');
    expect(items[1].textContent?.trim()).toBe('Delete user');
  });

  it('emits the selected item', () => {
    const trigger = fixture.nativeElement.querySelector('button[aria-haspopup="menu"]') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLButtonElement>;
    items[1].click();
    fixture.detectChanges();

    expect(host.selected?.value).toBe('delete-user');
  });
});
