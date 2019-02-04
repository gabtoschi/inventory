import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaList'
})
export class CommaListPipe implements PipeTransform {

  transform(value: string[]): string {
    let str = "";

    for (let i = 0; i < value.length - 1; i++){
      str += value[i];
      str += ", ";
    }

    str += value[value.length - 1];
    return str;
  }

}
