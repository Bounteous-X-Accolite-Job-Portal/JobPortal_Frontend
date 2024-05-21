import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferralComponent } from './add-referral.component';

describe('AddReferralComponent', () => {
  let component: AddReferralComponent;
  let fixture: ComponentFixture<AddReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReferralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
