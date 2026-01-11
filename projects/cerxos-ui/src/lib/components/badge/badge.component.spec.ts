import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsBadgeComponent } from './badge.component';

describe('CxsBadgeComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsBadgeComponent],
    template: `
      <cxs-badge>Beta</cxs-badge>
      <cxs-badge variant="danger">Blocked</cxs-badge>
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
    const badges = fixture.nativeElement.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
    expect(badges[0].textContent?.trim()).toBe('Beta');
    expect(badges[1].textContent?.trim()).toBe('Blocked');
  });
});
