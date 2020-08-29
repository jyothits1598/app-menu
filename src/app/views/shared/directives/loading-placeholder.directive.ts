import { Directive, Input, ViewContainerRef, ElementRef, Renderer2, ComponentFactoryResolver, SimpleChanges } from '@angular/core';
import { LoadingPlaceholderComponent } from '../components/loading-placeholder/loading-placeholder.component';

@Directive({
  selector: '[loadingPlaceholder]'
})
export class LoadingPlaceholderDirective {

  @Input() loadStatus: any;

  constructor(private viewCR: ViewContainerRef,
    private elem: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    console.log('view in loading placedholder called');
    this.renderer.setStyle(this.elem.nativeElement, 'display', 'none');
    let componentFactory = this.resolver.resolveComponentFactory(LoadingPlaceholderComponent)
    let componetRef = this.viewCR.createComponent(componentFactory);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.viewCR.clear();
    if(this.loadStatus) this.renderer.setStyle(this.elem.nativeElement, 'display', 'block');
  }

  ngOnInit(): void {

  }

}
