import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailComponentChangePasswordComponent } from './email-component-change-password.component';

describe('EmailComponentChangePasswordComponent', () => {
  let component: EmailComponentChangePasswordComponent;
  let fixture: ComponentFixture<EmailComponentChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailComponentChangePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailComponentChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
