import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'realCurrency',
  standalone: true
})
export class RealCurrencyPipe implements PipeTransform {

    transform(value: number | null): string {
        if (value === null || value === undefined) {
          return '';
        }

        const formattedValue = value.toFixed(2).replace('.', ',');

        const [integerPart, decimalPart] = formattedValue.split(',');

        const integerWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return `R$ ${integerWithDots},${decimalPart}`;
    }

}
