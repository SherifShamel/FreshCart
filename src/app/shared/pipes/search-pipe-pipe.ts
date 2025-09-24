import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(arr: any[], searchKey: string) {
    return arr.filter((currentItem) =>
      currentItem.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }
}
