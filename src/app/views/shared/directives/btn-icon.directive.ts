import { Directive, ElementRef, OnInit, Renderer2, ViewChildren, QueryList, AfterViewInit, ContentChildren, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBtnIcon]'
})
export class BtnIconDirective implements OnInit, AfterViewInit, OnChanges {
  constructor(private element: ElementRef
    , private renderer: Renderer2) { }

  icon: ElementRef;

  @ContentChildren("span") divs: QueryList<ElementRef>

  @Input()
  valid: boolean;

  @Input()
  loading: boolean;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.generateCheck();
    this.checkStates();
  }

  generateCheck() {
    this.icon = this.renderer.createElement('span');
    this.renderer.insertBefore(this.element.nativeElement, this.icon, this.divs.first.nativeElement)
  }

  checkStates() {
    if (!this.icon) {
      console.log('not icon');
      return;
    }

    if (this.valid) {
      this.renderer.addClass(this.icon, 'btn-icon-check');
      this.renderer.addClass(this.element.nativeElement, 'std-button-active--primary');
    }
    else {
      this.renderer.removeClass(this.icon, 'btn-icon-check');
      this.renderer.removeClass(this.element.nativeElement, 'std-button-active--primary');
    }
        
    this.loading ? this.renderer.addClass(this.icon, 'btn-icon-loader')
      : this.renderer.removeClass(this.icon, 'btn-icon-loader');
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.checkStates();
  }

}
