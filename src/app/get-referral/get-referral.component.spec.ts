import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReferralComponent } from './get-referral.component';

describe('GetReferralComponent', () => {
  let component: GetReferralComponent;
  let fixture: ComponentFixture<GetReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetReferralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
