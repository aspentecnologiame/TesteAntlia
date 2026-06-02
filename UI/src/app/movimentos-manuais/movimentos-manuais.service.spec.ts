/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovimentosManuaisService } from './movimentos-manuais.service';

describe('Service: MovimentosManuais', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimentosManuaisService]
    });
  });

  it('should ...', inject([MovimentosManuaisService], (service: MovimentosManuaisService) => {
    expect(service).toBeTruthy();
  }));
});
