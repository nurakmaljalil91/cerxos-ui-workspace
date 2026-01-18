import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsTabPanelComponent } from './tab-panel.component';
import { CxsTabsComponent } from './tabs.component';

describe('CxsTabsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsTabsComponent, CxsTabPanelComponent],
    template: `
      <cxs-tabs [(activeId)]="activeId">
        <cxs-tab-panel id="overview" label="Overview">Overview content</cxs-tab-panel>
        <cxs-tab-panel id="customers" label="Customers">Customers content</cxs-tab-panel>
      </cxs-tabs>
    `
  })
  class TestHostComponent {
    activeId = 'overview';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the active tab content', () => {
    expect(fixture.nativeElement.textContent).toContain('Overview content');
  });

  it('updates active tab on click', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();

    expect(host.activeId).toBe('customers');
    expect(fixture.nativeElement.textContent).toContain('Customers content');
  });
});
