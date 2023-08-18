import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

describe('(3) Prueba a "AuthService"', () => {

  let service: AuthService;
  let httpClientSpy: { post: jasmine.Spy }; // aquí estamos declarando la variable

  beforeEach(() => { // Antes de cada it (prueba)
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy as any);
  });


  it('Debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });


  it('Deberia retornar objecto usuario (Login Correcto)', (done: DoneFn) => {
    //Mock de datos
    const mockUserCredentials = {
      email: 'unemail@gmail.com',
      password: '123456'
    }
    const mockResultLogin = {
      "data": {
        "id": 2,
        "user": "usuario"
      }
    }
    httpClientSpy.post.and.returnValue(of(mockResultLogin)); // convertimos el mock en Observable con of()
    const { email, password } = mockUserCredentials;
    service.login(email, password)
      .subscribe(resultado => { //Como No se sabe el tiempo de respuesta tenemos que poner el done() al final
        expect(resultado).toEqual(mockResultLogin);
        done();
      })
  });

  it(`Deberia retornar error 409`, (done: DoneFn) => {
    //Mock de datos!
    const mockUserCredentials = {
      email: 'leifer33@gmail.com',
      password: ''
    }
    const error409 = new HttpErrorResponse({
      error: "Invalid user",
      status: 409, statusText: 'Not Found'
    })
    httpClientSpy.post.and.returnValue(throwError(error409))
    const { email, password } = mockUserCredentials
    service.login(email, password)
      .subscribe(res => { // nada por aquí porque esperamos capturar el error
      },
        error => {
          expect(error.status).toEqual(409);
          done()
        })
  })

});
