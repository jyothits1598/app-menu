import { DoCheck, OnInit } from '@angular/core';
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[lazyImage]'
})
export class LazyImageDirective implements OnInit, OnChanges {
  // @Input() imageUrl(url: string) {
  //   console.log('inside set method', url);

  // }

  @Input() imageUrl: string;

  constructor(
    private host: ElementRef,
    private renderer: Renderer2) {
      
  }
  // ngDoCheck(): void {

  // }
  ngOnInit(): void {
    this.renderer.addClass(this.host.nativeElement, 'lazy-image');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('inside onchanges', changes);
    if (this.imageUrl) {
      let img = new Image();
      console.log('setting src ', this.imageUrl);
      img.src = this.imageUrl;

      img.onload = () => {
        this.host.nativeElement.src = this.imageUrl;
        this.renderer.removeClass(this.host.nativeElement, 'lazy-image');
      };
    }
  }

}
