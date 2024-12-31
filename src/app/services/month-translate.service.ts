import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MonthTranslateService {

    private monthTranslates: { [key: string]: string } = {
        JANUARY: 'Janeiro',
        FEBRUARY: 'Fevereiro',
        MARCH: 'Março',
        APRIL: 'Abril',
        MAY: 'Maio',
        JUNE: 'Junho',
        JULY: 'Julho',
        AUGUST: 'Agosto',
        SEPTEMBER: 'Setembro',
        OCTOBER: 'Outubro',
        NOVEMBER: 'Novembro',
        DECEMBER: 'Dezembro',
    };

    constructor() { }

    translate(mesEmIngles: string): string {
        return this.monthTranslates[mesEmIngles] || mesEmIngles;
    }

}
