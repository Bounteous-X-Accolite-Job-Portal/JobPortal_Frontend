import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewHubComponent } from './interview-hub.component';

describe('InterviewHubComponent', () => {
  let component: InterviewHubComponent;
  let fixture: ComponentFixture<InterviewHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
