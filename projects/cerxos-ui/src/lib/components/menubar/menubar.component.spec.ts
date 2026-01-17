import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsMenubarComponent, CxsMenubarItem } from './menubar.component';

describe('CxsMenubarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsMenubarComponent],
    template: `
      <cxs-menubar [items]="items" (itemSelected)="onSelected($event)"></cxs-menubar>
    `
  })
  class TestHostComponent {
    items: CxsMenubarItem[] = [
      { label: 'Home', href: '#', active: true },
      { label: 'Create' },
      { label: 'Settings', href: '#settings' },
      { label: 'Disabled', href: '#disabled', disabled: true }
    ];
    selected?: CxsMenubarItem;

    onSelected(item: CxsMenubarItem): void {
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

  it('renders the menubar items', () => {
    const items = fixture.nativeElement.querySelectorAll('[role="menuitem"]');
    expect(items.length).toBe(4);
    expect(items[0].textContent?.trim()).toBe('Home');
    expect(items[1].textContent?.trim()).toBe('Create');
    expect(items[2].textContent?.trim()).toBe('Settings');
    expect(items[3].textContent?.trim()).toBe('Disabled');
  });

  it('marks the active item as the current page', () => {
    const current = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLElement;
    expect(current).toBeTruthy();
    expect(current.textContent?.trim()).toBe('Home');
  });

  it('prevents navigation for disabled links', () => {
    const disabledLink = fixture.nativeElement.querySelectorAll('a')[2] as HTMLAnchorElement;
    expect(disabledLink.getAttribute('href')).toBeNull();
    expect(disabledLink.getAttribute('aria-disabled')).toBe('true');
  });

  it('emits selection for enabled items only', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    buttons[0].click();
    fixture.detectChanges();

    expect(host.selected?.label).toBe('Create');

    const disabledLink = fixture.nativeElement.querySelectorAll('a')[2] as HTMLAnchorElement;
    disabledLink.click();
    fixture.detectChanges();

    expect(host.selected?.label).toBe('Create');
  });

  it('moves focus with arrow keys', () => {
    const list = fixture.nativeElement.querySelector('[role="menubar"]') as HTMLUListElement;
    const items = fixture.nativeElement.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>;
    items[0].focus();

    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(items[1]);
  });
});
