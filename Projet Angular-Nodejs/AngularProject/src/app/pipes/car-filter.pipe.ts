import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carFilter',
})
export class CarFilterPipe implements PipeTransform {
  transform(items: any[], filterQuery: any): any[] {
    if (!filterQuery) return items;
    return items.filter((item) =>
      item.make.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }
}
