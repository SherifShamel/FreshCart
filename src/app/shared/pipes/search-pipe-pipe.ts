import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct.interface';

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
