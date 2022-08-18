import { TestBed } from '@angular/core/testing';

import { DisenoService } from './diseno.service';

describe('DisenoService', () => {
  let service: DisenoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisenoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
