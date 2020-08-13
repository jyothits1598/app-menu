import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[focusOnLoad]'
})
export class FocusOnLoadDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }

}
