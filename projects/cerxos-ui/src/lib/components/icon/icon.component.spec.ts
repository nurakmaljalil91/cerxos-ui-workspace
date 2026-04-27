import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsIconComponent, CxsIconName } from './icon.component';

describe('CxsIconComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsIconComponent],
    template: `<cxs-icon [name]="name" [label]="label"></cxs-icon>`
  })
  class TestHostComponent {
    name: CxsIconName = 'user';
    label?: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('renders the requested icon', () => {
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    const paths = svg.querySelectorAll('path');

    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('marks icons as decorative by default', () => {
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;

    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('role')).toBeNull();
  });

  it('renders an accessible label when provided', () => {
    host.label = 'Open profile';
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    const title = svg.querySelector('title');

    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-hidden')).toBeNull();
    expect(title?.textContent).toBe('Open profile');
    expect(svg.getAttribute('aria-labelledby')).toBe(title?.getAttribute('id') ?? null);
  });
});
