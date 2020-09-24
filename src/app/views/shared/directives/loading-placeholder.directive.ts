import { Directive, Input, ViewContainerRef, ElementRef, Renderer2, ComponentFactoryResolver, SimpleChanges, ComponentFactory } from '@angular/core';
import { LoadingPlaceholderComponent } from '../components/loading-placeholder/loading-placeholder.component';

@Directive({
  selector: '[loadingPlaceholder]'
})
export class LoadingPlaceholderDirective {

  @Input() loadStatus: any;
  componentFactory: ComponentFactory<any>;

  constructor(private viewCR: ViewContainerRef,
    private elem: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    // if(!this.loadStatus){
    //   this.renderer.setStyle(this.elem.nativeElement, 'display', 'none');
    //   let componentFactory = this.resolver.resolveComponentFactory(LoadingPlaceholderComponent)
    //   let componetRef = this.viewCR.createComponent(componentFactory);
    // }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.viewCR.clear();
    if(!this.loadStatus){
      this.renderer.setStyle(this.elem.nativeElement, 'display', 'none');
      let componentFactory = this.resolver.resolveComponentFactory(LoadingPlaceholderComponent);
      let componetRef = this.viewCR.createComponent(componentFactory);
    }else{
      if(this.loadStatus) this.renderer.setStyle(this.elem.nativeElement, 'display', 'block');
    }

  }

  ngOnInit(): void {

  }

}
