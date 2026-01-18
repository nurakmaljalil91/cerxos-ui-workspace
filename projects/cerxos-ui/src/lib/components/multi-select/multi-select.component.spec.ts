import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CxsMultiSelectComponent } from './multi-select.component';

describe('CxsMultiSelectComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [FormsModule, CxsMultiSelectComponent],
    template: `
      <cxs-multi-select
        [(ngModel)]="value"
        [options]="options"
        placeholder="Search teams"
      ></cxs-multi-select>
    `
  })
  class TestHostComponent {
    value: string[] = [];
    options = [
      { label: 'Platform', value: 'platform' },
      { label: 'Design', value: 'design' },
      { label: 'Product', value: 'product' }
    ];
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('adds a value when selecting an option', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsMultiSelectComponent;
    component.selectOption({ label: 'Design', value: 'design' });
    fixture.detectChanges();

    expect(host.value).toEqual(['design']);
  });

  it('removes a value when removing a chip', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsMultiSelectComponent;
    component.writeValue(['platform', 'product']);
    fixture.detectChanges();

    component.removeValue('platform');
    fixture.detectChanges();

    expect(host.value).toEqual(['product']);
  });

  it('filters options based on the query', () => {
    const component = fixture.debugElement.children[0].componentInstance as CxsMultiSelectComponent;
    component.query = 'prod';
    fixture.detectChanges();

    const options = component.filteredOptions;
    expect(options.length).toBe(1);
    expect(options[0].value).toBe('product');
  });
});
