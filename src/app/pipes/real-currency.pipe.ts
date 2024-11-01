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
      return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }

}
