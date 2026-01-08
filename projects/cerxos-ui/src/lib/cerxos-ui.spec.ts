import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerxosUi } from './cerxos-ui';

describe('CerxosUi', () => {
  let component: CerxosUi;
  let fixture: ComponentFixture<CerxosUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerxosUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerxosUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
