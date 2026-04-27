import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsButtonComponent } from './button.component';
import { CxsButtonVariant } from './button.component';
import { CxsIconName } from '../icon/icon.component';

describe('CxsButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsButtonComponent],
    template: `
      <cxs-button
        class="w-full"
        [variant]="variant"
        [loading]="loading"
        [icon]="icon"
        [iconOnly]="iconOnly"
        [ariaLabel]="ariaLabel"
      >
        {{ label }}
      </cxs-button>
    `
  })
  class TestHostComponent {
    loading = false;
    label = 'Save';
    variant: CxsButtonVariant = 'primary';
    icon?: CxsIconName;
    iconOnly = false;
    ariaLabel?: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('renders projected content', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.textContent?.trim()).toBe('Save');
  });

  it('disables when loading', () => {
    host.loading = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('forwards host classes to the button', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.classList.contains('w-full')).toBeTrue();
  });

  it('applies the danger variant styles', () => {
    host.variant = 'danger';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.className).toContain('bg-[var(--cxs-color-danger)]');
    expect(button.className).toContain('text-[var(--cxs-color-on-danger)]');
  });

  it('renders a named icon', () => {
    host.icon = 'user';
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('cxs-icon svg') as SVGElement | null;
    expect(icon).not.toBeNull();
  });

  it('renders icon-only buttons as circular buttons', () => {
    host.icon = 'search';
    host.iconOnly = true;
    host.ariaLabel = 'Search workspace';
    host.label = '';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.classList.contains('rounded-full')).toBeTrue();
    expect(button.classList.contains('w-10')).toBeTrue();
    expect(button.getAttribute('aria-label')).toBe('Search workspace');
  });

  it('requires an aria label for icon-only buttons', () => {
    host.icon = 'search';
    host.iconOnly = true;
    host.label = '';

    expect(() => fixture.detectChanges()).toThrowError(
      'cxs-button with iconOnly=true requires ariaLabel.'
    );
  });
});
