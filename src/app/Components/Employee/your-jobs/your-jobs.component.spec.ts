import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourJobsComponent } from './your-jobs.component';

describe('YourJobsComponent', () => {
  let component: YourJobsComponent;
  let fixture: ComponentFixture<YourJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
