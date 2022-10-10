import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDialogComponent } from './wizard-dialog.component';

describe('WizardDialogComponent', () => {
  let component: WizardDialogComponent;
  let fixture: ComponentFixture<WizardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
