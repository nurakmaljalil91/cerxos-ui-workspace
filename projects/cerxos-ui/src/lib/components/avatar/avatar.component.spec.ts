import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxsAvatarComponent } from './avatar.component';

describe('CxsAvatarComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  @Component({
    selector: 'cxs-test-host',
    standalone: true,
    imports: [CxsAvatarComponent],
    template: `
      <cxs-avatar [src]="src" [name]="name" [alt]="alt"></cxs-avatar>
    `
  })
  class TestHostComponent {
    src?: string;
    name = 'Ada Lovelace';
    alt?: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders initials when no image is provided', () => {
    const fallback = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    expect(fallback).toBeTruthy();
    expect(fallback.textContent?.trim()).toBe('AL');
  });

  it('renders an image when src is provided', () => {
    host.src = 'https://example.com/avatar.png';
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(image).toBeTruthy();
    expect(image.getAttribute('alt')).toBe('Ada Lovelace');
  });

  it('falls back to initials when the image fails to load', () => {
    host.src = 'https://example.com/avatar.png';
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    const fallback = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    expect(fallback.textContent?.trim()).toBe('AL');
  });

  it('uses aria-label on fallback', () => {
    const container = fixture.nativeElement.querySelector('div') as HTMLDivElement;
    expect(container.getAttribute('aria-label')).toBe('Ada Lovelace');
  });
});
