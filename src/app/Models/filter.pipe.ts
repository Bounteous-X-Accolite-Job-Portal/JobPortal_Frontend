import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' ,
  standalone: true
})
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(list: any[], searchText: string): any[] {
    return list
    ? list.filter(
        (item) => item.search(new RegExp(searchText, 'i')) > -1
      )
    : [];
  }
}