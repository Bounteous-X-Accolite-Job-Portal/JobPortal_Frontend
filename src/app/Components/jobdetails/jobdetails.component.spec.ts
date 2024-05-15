mport { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/Components/jobdetails/jobdetails.component.spec.ts
import { JobdetailsComponent } from './jobdetails.component';

describe('JobdetailsComponent', () => {
  let component: JobdetailsComponent;
  let fixture: ComponentFixture<JobdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobdetailsComponent);
========
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillsComponent);
>>>>>>>> 32baae9edf0de0cd5d84ca3c892476e8a39b57ba:src/app/Components/skills/skills.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
