import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  /** Mi solución
  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    console.log('diff', diff);
    const seconds = Math.floor(diff / 1000);
    console.log('seconds', seconds);
    const minutes = Math.floor(seconds / 60);
    console.log('minutes', minutes);
    const hours = Math.floor(minutes / 60);
    console.log('hours', hours);
    const days = Math.floor(hours / 24);
    console.log('days', days);
    const months = Math.floor(days / 30);
    console.log('months', months);
    const years = Math.floor(months / 12);
    console.log('years', years);


    if (years) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }

    if (months) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    if (days) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    if (hours) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    if (minutes >= 1) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }

    return 'Just now';
  }
  */

  // Solución con la libreria date-fns
  transform(value: string): string {
    // return formatDistance(new Date(value), new Date());
    return formatDistanceToNow(new Date(value), { addSuffix: true }); // agrega el 'ago' o 'from now' o 'in x'
  }

}
