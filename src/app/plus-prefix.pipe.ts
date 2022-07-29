import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plusPrefix'
})
export class PlusPrefixPipe implements PipeTransform {

  transform(value: number): string {
    return value > 0 ? `+${value}` : `${value}`;
  }

}
