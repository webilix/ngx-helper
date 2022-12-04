import { TestBed } from '@angular/core/testing';

import { NgxUtilsService } from './ngx-utils.service';

describe('NgxUtilsService', () => {
  let service: NgxUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
