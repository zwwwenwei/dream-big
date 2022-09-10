import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbPickerComponent } from './rgb-picker.component';

describe('RgbPickerComponent', () => {
  let component: RgbPickerComponent;
  let fixture: ComponentFixture<RgbPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgbPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgbPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
