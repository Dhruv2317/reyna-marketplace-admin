import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: string): any {
    var number;
    if (value && value.length == 10) {
      number = "(" + value.slice(0, 3) + ") " + value.slice(3, 6) + "-" + value.slice(6);
    }
    else {
      number = value;
    }
    return number;
  }

}