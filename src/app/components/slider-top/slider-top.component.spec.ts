import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTopComponent } from './slider-top.component';

describe('SliderTopComponent', () => {
  let component: SliderTopComponent;
  let fixture: ComponentFixture<SliderTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
