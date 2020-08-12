import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], args: string): any {
        return items.filter(item => item.item_name.toLowerCase().includes(args.toLowerCase()));
    }
}