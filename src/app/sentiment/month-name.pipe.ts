import { Pipe, PipeTransform } from '@angular/core';
import { Month } from '../core/stock.model';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(month: Month | undefined): unknown {
    if (!month) {
      return 'UNKNOWN';
    }
    
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('en-US', {
        month: 'long'
    }).toUpperCase();
  }

}
