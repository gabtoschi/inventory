import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayDifference',
  pure: false
})
export class ArrayDifferencePipe implements PipeTransform {

  transform(value: string[], diff: string[]): any {

    return value.filter(
      (val) => {
        return true;
      }
    );

  }

}
