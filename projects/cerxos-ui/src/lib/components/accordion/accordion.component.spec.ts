import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsAccordionComponent } from './accordion.component';
import { CxsAccordionItemComponent } from './accordion-item.component';

describe('CxsAccordionComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsAccordionComponent, CxsAccordionItemComponent],
    template: `
      <cxs-accordion>
        <cxs-accordion-item title="First">Content A</cxs-accordion-item>
        <cxs-accordion-item title="Second" [expanded]="true">Content B</cxs-accordion-item>
      </cxs-accordion>
    `
  })
  class TestHostComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('renders accordion items', () => {
    const items = fixture.nativeElement.querySelectorAll('cxs-accordion-item');
    expect(items.length).toBe(2);
  });

  it('shows expanded content when expanded', () => {
    const panels = fixture.nativeElement.querySelectorAll('[role="region"]') as NodeListOf<HTMLElement>;
    expect(panels[0].hidden).toBe(true);
    expect(panels[1].hidden).toBe(false);
  });
});
