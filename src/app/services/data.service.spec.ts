import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('(2) Prueba a "DataService"', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('Debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it(`Revisar generación de numeros`, () => {
    const [numero1, numero2] = service.generarDosNumerosAleatorios() //TODO: [1,2]
    const sum = numero1 + numero2;
    expect(sum).toMatch(/\d{1,}/) // Expresión regular que dice que espera un número
  })

  it(`Revisar operacion matematica`, () => {
    const numero1 = 5
    const numero2 = 4
    const check = service.comprobarOperacion(numero1, numero2, 9)
    expect(check).toBeTrue()
  })

});
