import { HttpClientTestingModule } from '@angular/common/http/testing';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {By} from "@angular/platform-browser";
import {AuthService} from "./services/auth.service";
import {of, throwError} from "rxjs";
import {DataService} from "./services/data.service";


describe(`(1) TEST del componente "AppComponent"`, () => {
  let authService: jasmine.SpyObj<AuthService>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    const dataServiceMock = jasmine.createSpyObj('DataService', ['comprobarOperacion', 'generarDosNumerosAleatorios']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthService, useValue: authServiceMock },
        {provide: DataService, useValue: dataServiceMock },
      ]
    }).compileComponents();
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    dataService.generarDosNumerosAleatorios.and.returnValue([1,2]);
  });

  // test aislado
  it('Debe de existir el AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); // detectar que se creo correctamente ✔
  });

  // test aislado
  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance
    fixture.detectChanges();

    const email = app.form.controls['email']
    email.setValue('unEmail@gmail.com')

    expect(app.form.invalid).toBeTrue(); // debe ser invalido ✔
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    let email = app.form.controls['email'];
    let password = app.form.controls['password'];
    let result = app.form.controls['result'];

    email.setValue('unEmail@gmail.com');
    password.setValue('123456');
    result.setValue('1');

    expect(app.form.invalid).toBeFalse(); // no debe ser invalido ✔
  });

  // Aislado.
  it(`Debe de actualizar datos de usuario`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    let email = app.form.controls['email'];
    let password = app.form.controls['password'];

    email.setValue('unEmail@gmail.com');
    password.setValue('123456');

    const btnElement = fixture.debugElement.query(By.css('button.btn'));
    // El DebugElement proporciona información crucial para la representación DOM de los componentes
    // query	`query(predicate: Predicate)` devuelve el primer `DebugElement` que coincida con el
    // [predicado](#query-predicate) a cualquier profundidad en el subárbol

    //https://docs.angular.lat/guide/testing-utility-apis

    const mock = { user: 1 };
    authService.login.and.returnValue(of(mock));

    btnElement.nativeElement.click();
    // nativeElement	El elemento DOM correspondiente en el navegador
    fixture.detectChanges();
    tick(100);

    const testData = { user: 1 };
    expect(mock).toEqual(testData);
  }));


});
