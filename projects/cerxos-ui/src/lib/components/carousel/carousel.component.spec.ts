import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CxsCarouselComponent, CxsCarouselItem } from './carousel.component';

describe('CxsCarouselComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsCarouselComponent],
    template: `
      <cxs-carousel
        [items]="items"
        [activeIndex]="activeIndex"
        [autoplay]="autoplay"
        [interval]="interval"
        (activeIndexChange)="activeIndex = $event"
      ></cxs-carousel>
    `
  })
  class TestHostComponent {
    items: CxsCarouselItem[] = [
      { title: 'One', description: 'First' },
      { title: 'Two', description: 'Second' },
      { title: 'Three', description: 'Third' }
    ];
    activeIndex = 0;
    autoplay = false;
    interval = 1000;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders slides', () => {
    const slides = fixture.nativeElement.querySelectorAll('div > div > div') as NodeListOf<HTMLElement>;
    expect(slides.length).toBe(3);
  });

  it('moves to next slide when clicking next', () => {
    const nextButton = fixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement;
    nextButton.click();
    fixture.detectChanges();

    expect(host.activeIndex).toBe(1);
  });

  it('auto-advances when autoplay is enabled', fakeAsync(() => {
    host.autoplay = true;
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(host.activeIndex).toBe(1);
  }));
});
