import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], args: string, accessor: (any)=>string): any {
        return items.filter(item => accessor(item).toLowerCase().includes(args.toLowerCase()));
    }
}