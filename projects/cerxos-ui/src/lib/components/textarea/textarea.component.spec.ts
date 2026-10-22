import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CxsTextareaComponent } from './textarea.component';

describe('CxsTextareaComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [ReactiveFormsModule, CxsTextareaComponent],
    template: `
      <cxs-textarea [formControl]="description" label="Description" [rows]="rows" [invalid]="invalid">
        <span cxsTextareaError>Description is too long</span>
      </cxs-textarea>
    `
  })
  class TestHostComponent {
    readonly description = new FormControl('initial', { nonNullable: true });
    rows = 3;
    invalid = false;
  }

  function textarea(): HTMLTextAreaElement {
    return fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
  }

  function component(): CxsTextareaComponent {
    return fixture.debugElement.children[0].componentInstance as CxsTextareaComponent;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the form control value', () => {
    expect(textarea().value).toBe('initial');
  });

  it('shows multi-line values written by the form', () => {
    host.description.setValue('Line one\nLine two');
    fixture.detectChanges();

    expect(textarea().value).toBe('Line one\nLine two');
  });

  it('propagates typed text including line breaks to the form', () => {
    textarea().value = 'First\nSecond';
    textarea().dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.description.value).toBe('First\nSecond');
  });

  it('marks the control touched on blur', () => {
    expect(host.description.touched).toBeFalse();

    textarea().dispatchEvent(new Event('blur'));

    expect(host.description.touched).toBeTrue();
  });

  it('disables the textarea when the form control is disabled', () => {
    host.description.disable();
    fixture.detectChanges();

    expect(textarea().disabled).toBeTrue();

    host.description.enable();
    fixture.detectChanges();

    expect(textarea().disabled).toBeFalse();
  });

  it('applies the rows input', () => {
    host.rows = 5;
    fixture.detectChanges();

    expect(textarea().rows).toBe(5);
  });

  it('associates the visible label with the textarea', () => {
    const label = fixture.nativeElement.querySelector('label') as HTMLLabelElement;

    expect(label.textContent?.trim()).toBe('Description');
    expect(label.getAttribute('for')).toBe(textarea().id);
    expect(textarea().getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('announces the invalid state and links the error content', () => {
    expect(textarea().getAttribute('aria-invalid')).toBeNull();

    host.invalid = true;
    fixture.detectChanges();

    const errorContainer = fixture.nativeElement.querySelector(
      `#${component().errorId}`
    ) as HTMLElement | null;

    expect(textarea().getAttribute('aria-invalid')).toBe('true');
    expect(errorContainer?.textContent).toContain('Description is too long');
    expect(textarea().getAttribute('aria-describedby')).toContain(component().errorId);
  });

  it('uses theme variables for its colors', () => {
    expect(textarea().className).toContain('border-[var(--cxs-color-border)]');
    expect(textarea().className).toContain('focus-visible:outline-[var(--cxs-color-focus)]');
  });
});
