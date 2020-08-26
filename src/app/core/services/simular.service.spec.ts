import { TestBed } from '@angular/core/testing';

import { SimularService } from './simular.service';

describe('SimularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimularService = TestBed.get(SimularService);
    expect(service).toBeTruthy();
  });
});
