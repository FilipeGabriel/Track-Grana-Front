import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicCurrency',
  standalone: true
})
export class DynamicCurrencyPipe implements PipeTransform {
  transform(value: string | number): string {
    let digits = typeof value === 'number' ? String(value) : String(value).replace(/\D/g, '');
    if (!digits) return '0,00';
    while (digits.length < 3) {
      digits = '0' + digits;
    }
    const integerPart = digits.slice(0, -2);
    const decimalPart = digits.slice(-2);
    const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedInt},${decimalPart}`;
  }
}
