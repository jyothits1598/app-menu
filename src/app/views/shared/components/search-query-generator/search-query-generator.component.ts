import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { debounce, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'search-query-generator',
  templateUrl: './search-query-generator.component.html',
  styleUrls: ['./search-query-generator.component.scss']
})
export class SearchQueryGeneratorComponent implements AfterViewInit {
  @ViewChild('typeSelect', { read: ElementRef }) typeSelect: ElementRef
  @ViewChild('termInput', { read: ElementRef }) termInput: ElementRef;

  keyupSubs: Subscription;

  term: string = '';
  type: string = '';

  constructor() { }

  ngAfterViewInit(): void {
    console.log('this is the search', this.types.length, this.types);
    this.keyupSubs = fromEvent(this.termInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        distinctUntilChanged(),
        debounce(() => interval(500)),
      ).subscribe(val => { this.term = val; this.query.emit(this.selectionToQuery()) });
  }

  @Input() termName: string;
  @Input() typeName: string;
  @Input() types: Array<string>;

  @Output() query = new EventEmitter<string>();

  selectionToQuery() {
    let term = `${this.termName}=${this.term}`;
    let type = `${this.typeName}=${this.type}`;
    let final = ((this.term || this.type) ? '?' : '') + (this.term? term : '') + ((this.term && this.type) ? '&' : '') + (this.type? type : '');
    return final;
  }

  handleInput(val){
    console.log(val);
  }
}
