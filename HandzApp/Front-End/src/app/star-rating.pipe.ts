import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < value ? '★' : '☆';
    }
    return stars;
  }
}
