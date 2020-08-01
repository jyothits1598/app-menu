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
  }

  generateCheck() {
    this.icon = this.renderer.createElement('span');
    this.renderer.insertBefore(this.element.nativeElement, this.icon, this.divs.first.nativeElement)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log("host element", this.element);
    // console.log("icon", this.icon);

    if (!this.icon) return;

    if (changes.valid) {
      if(changes.valid.currentValue){
        this.renderer.addClass(this.icon, 'btn-icon-check');
        this.renderer.addClass(this.element.nativeElement, 'std-button--blue');
      }
      else {
        this.renderer.removeClass(this.icon, 'btn-icon-check');
        this.renderer.removeClass(this.element.nativeElement, 'std-button--blue');
      }
      changes.valid.currentValue ? this.renderer.addClass(this.icon, 'btn-icon-check')
        : this.renderer.removeClass(this.icon, 'btn-icon-check');
      this.renderer.removeClass(this.icon, 'btn-icon-loader')
    }
    if (changes.loading) {
      changes.loading.currentValue ? this.renderer.addClass(this.icon, 'btn-icon-loader')
        : this.renderer.removeClass(this.icon, 'btn-icon-loader');
    }
  }
}
