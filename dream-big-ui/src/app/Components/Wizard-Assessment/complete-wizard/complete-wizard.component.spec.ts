import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteWizardComponent } from './complete-wizard.component';

describe('CompleteWizardComponent', () => {
  let component: CompleteWizardComponent;
  let fixture: ComponentFixture<CompleteWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
