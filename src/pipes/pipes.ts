import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({name: 'mcMapToArray'})
export class MapToArrayPipe implements PipeTransform {
  transform(value: any): any {
    return value ? value.toArray().map(s => s.toJS()) : [];
  }
}

@Pipe({name: 'mcOrderBy'})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], keys: string[], desc = false): any {
    if (!Array.isArray(keys) || keys.length === 0) {
      return value;
    }

    value.sort((a, b): number => {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (a[key] < b[key]) {
          return desc ? 1 : -1;
        }

        if (a[key] > b[key]) {
          return desc ? -1 : 1;
        }
      }

      return 0;
    });

    return value;
  }
}
