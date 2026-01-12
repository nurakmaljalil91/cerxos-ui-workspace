import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsCardComponent } from './card.component';

describe('CxsCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsCardComponent],
    template: `
      <cxs-card size="lg">
        <p>Card content</p>
      </cxs-card>
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

  it('renders projected content', () => {
    const content = fixture.nativeElement.querySelector('p') as HTMLParagraphElement;
    expect(content.textContent?.trim()).toBe('Card content');
  });

  it('applies size classes', () => {
    const section = fixture.nativeElement.querySelector('section') as HTMLElement;
    expect(section.className).toContain('p-7');
  });
});
