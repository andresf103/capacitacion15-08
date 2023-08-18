import {Injectable} from '@angular/core';
import {Operacion} from "../models/operacion";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  /**
   * Genera 2 números de manera aleatoria
   */
  generarDosNumerosAleatorios(): any {
    const numero1 = (Math.random() * 10).toFixed(0);
    const numero2 = (Math.random() * 5).toFixed(0);
    // el número que va a generar va a ir del 0 al 3
    const operacion = Number((Math.random() * 2).toFixed(0));
    // el 0 va a representar la suma
    // el 1 va a representar la resta
    // el 2 va a representar la multiplicación
      console.log({operacion});
    return {numero1, numero2, operacion};
  }

  /**
   * Recibe 3 parámetros 2 números y una respuesta
    */
  comprobarOperacion(numero1: number, numero2: number, operacion: Operacion , resultado: number): boolean {
    switch (operacion) {
      case Operacion.suma:
        return (Number(numero1) + Number(numero2)) === Number(resultado);
      case Operacion.resta:
        return (Number(numero1) - Number(numero2)) === Number(resultado);
      case Operacion.multiplicacion:
        return (Number(numero1) * Number(numero2)) === Number(resultado);
    }
  }
}
