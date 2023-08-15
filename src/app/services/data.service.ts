import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  /**
   * Genera 2 números de manera aleatoria
   */
  generarDosNumerosAleatorios(): any {
    const numero1 = (Math.random() * 10).toFixed(0)
    const numero2 = (Math.random() * 5).toFixed(0)
    return [numero1, numero2]
  }

  /**
   * Recibe 3 parámetros 2 números y una respuesta
    */
  comprobarOperacion(numero1: number, numero2: number, resultado: number): boolean {
    return (Number(numero1) + Number(numero2)) === Number(resultado)
  }
}
