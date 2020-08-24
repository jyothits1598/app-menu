import { Directive, Input, ViewContainerRef, ElementRef, Renderer2, ComponentFactoryResolver, SimpleChanges } from '@angular/core';
import { LoadingPlaceholderComponent } from '../components/loading-placeholder/loading-placeholder.component';

@Directive({
  selector: '[loadingPlaceholder]'
})
export class LoadingPlaceholderDirective {

  @Input() loaded: any;

  constructor(private viewCR: ViewContainerRef,
    private elem: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elem.nativeElement, 'filter', 'opacity(0.5)');
    let componentFactory = this.resolver.resolveComponentFactory(LoadingPlaceholderComponent)
    let componetRef = this.viewCR.createComponent(componentFactory);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.viewCR.clear();
    if(this.loaded) this.renderer.setStyle(this.elem.nativeElement, 'filter', 'opacity(1)')
  }

  ngOnInit(): void {

  }

}
