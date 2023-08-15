import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showEmoji: boolean = false;
  title = 'Unit Testing Angular';
  subTitle = 'Estamos aprendiendo sobre pruebas unitarias en componentes'
  contentEmoji = ''
  dataSession: any;
  form: FormGroup = new FormGroup({})
  isCheck: any;
  checkHuman: Array<any> = []

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, //TODO: Crear Api para que nos mande un usuario
    private dataService: DataService // el servicio que nos da la comprobación de humano
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      result: ['', [Validators.required]],
    })

    this.checkHuman = this.dataService.generarDosNumerosAleatorios() // [1,2]
  }

  sendLogin(): void {
    const [numero1, numero2] = this.checkHuman; //desestructuramos sus datos [1,2]
    const result = this.form.value.result
    const check = this.dataService.comprobarOperacion(numero1, numero2, result)
    if (!check) {
      this.isCheck = 'ERROR_CHECK'
      return
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.login(email, password)
      .subscribe(res => this.dataSession = res, //TODO: Objeto usuario
        () => this.isCheck = 'ERROR_USER')
  }
}
