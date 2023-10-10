import { TestBed } from '@angular/core/testing';

import { ListaUsuariosService } from './lista-usuarios.service';

describe('ListaUsuariosService', () => {
  let service: ListaUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
