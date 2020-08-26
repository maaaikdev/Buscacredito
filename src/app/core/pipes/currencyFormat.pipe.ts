import {Pipe} from '@angular/core';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
    name: 'currencyFormat'
})
export class CurrencyFormat {
    transform(
        value: number,
        currencySign: string = 'COP ',
        decimalLength: number = 0, 
        chunkDelimiter: string = '.', 
        decimalDelimiter:string = ',',
        chunkLength: number = 3
        ): string {

            value = value;

            const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
            const num = value.toFixed(Math.max(0, ~~decimalLength));

            // tslint:disable-next-line: max-line-length
            return currencySign + (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
        }
}