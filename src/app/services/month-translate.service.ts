import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthTranslateService {

    private monthTranslates: { [key: string]: string } = {
        January: 'Janeiro',
        February: 'Fevereiro',
        March: 'Março',
        April: 'Abril',
        May: 'Maio',
        June: 'Junho',
        July: 'Julho',
        August: 'Agosto',
        September: 'Setembro',
        October: 'Outubro',
        November: 'Novembro',
        December: 'Dezembro',
    };

    constructor() { }

    translate(mesEmIngles: string): string {
        return this.monthTranslates[mesEmIngles] || mesEmIngles;
    }

}
