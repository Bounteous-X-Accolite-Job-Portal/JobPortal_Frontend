import { TestBed } from '@angular/core/testing';

import { CrudJobDataService } from './crud-job-data.service';

describe('CrudJobDataService', () => {
  let service: CrudJobDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudJobDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
