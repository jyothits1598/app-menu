import { Component, OnInit, Input, ViewContainerRef, AfterViewInit, ElementRef, Renderer2, ViewChild, TemplateRef, EmbeddedViewRef, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Component({
  selector: 'processing-placeholder',
  templateUrl: './processing-placeholder.component.html',
  styleUrls: ['./processing-placeholder.component.scss']
})
export class ProcessingPlaceholderComponent {

  // @Input() progressObs: Observable<any>;

  // @ViewChild("vc", { read: ViewContainerRef }) vc: ViewContainerRef;
  // @ViewChild("loadingTemplate", { read: TemplateRef }) ltemplate: TemplateRef<any>;
  // @ViewChild("errorTemplate", { read: TemplateRef }) errTemplate: TemplateRef<any>;

  loadingView: EmbeddedViewRef<any>;
  errorView: EmbeddedViewRef<any>;

  subscription: Subscription;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2
  ) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log('recieved changes in', changes);
  //   // if(this.subscription) this.subscription.unsubscribe();
  //   // if (this.progressObs) this.subscription = this.progressObs.subscribe(() => { },
  //   //   error => { this.displayError(); })
  // }

  // displayError() {
  //   this.vc.remove();
  //   this.vc.insert(this.errorView);
  // }

  // ngAfterViewInit(): void {
  //   this.loadingView = this.ltemplate.createEmbeddedView(null);
  //   this.errorView = this.errTemplate.createEmbeddedView(null);
  //   this.vc.insert(this.loadingView);
  // }

  // ngOnInit(): void {
    
  // }

}
