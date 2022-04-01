import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter',
  pure: false
})
export class TableFilterPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.tasktype === filter);
}

}
