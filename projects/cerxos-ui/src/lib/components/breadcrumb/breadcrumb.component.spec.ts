import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsBreadcrumbComponent, CxsBreadcrumbItem } from './breadcrumb.component';

describe('CxsBreadcrumbComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsBreadcrumbComponent],
    template: `
      <cxs-breadcrumb [items]="items"></cxs-breadcrumb>
    `
  })
  class TestHostComponent {
    items: CxsBreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' }
    ];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders all breadcrumb items', () => {
    const items = fixture.nativeElement.querySelectorAll('li') as NodeListOf<HTMLLIElement>;
    expect(items.length).toBe(3);
    expect(items[0].textContent?.replace(/\s+/g, ' ').trim()).toContain('Home');
    expect(items[1].textContent?.replace(/\s+/g, ' ').trim()).toContain('Library');
    expect(items[2].textContent?.replace(/\s+/g, ' ').trim()).toContain('Data');
  });

  it('marks the last item as the current page', () => {
    const current = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLElement;
    expect(current).toBeTruthy();
    expect(current.textContent?.trim()).toBe('Data');
  });

  it('renders links only for non-current items with hrefs', () => {
    const links = fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    expect(links.length).toBe(2);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/library');
  });
});
