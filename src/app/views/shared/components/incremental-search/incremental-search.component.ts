import { Component, OnInit, ContentChild, ElementRef, AfterViewInit, EmbeddedViewRef, ViewContainerRef, Renderer2, ViewChild, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { tap, map, distinctUntilChanged, debounce, switchMap, finalize } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';
import { OverlayRef, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'incremental-search',
  templateUrl: './incremental-search.component.html',
  styleUrls: ['./incremental-search.component.scss']
})
export class IncrementalSearchComponent implements OnInit, AfterViewInit {
  listLoading: boolean = false;
  overLayVisible: boolean = false;

  constructor(private overlay: Overlay,
    private vCRef: ViewContainerRef) { }

  onOptionSelect(item: any) {
    this.onSelect.emit(item);
    this.closeOverlay();
  }
  ngAfterViewInit(): void {
    fromEvent(this.searchBox.nativeElement, 'focus').pipe(
      tap(() => {
        if (this.searchData.length > 0) this.openTemplateOverlay(this.overlayTemplate, this.searchBox);
      })
    ).subscribe();

    fromEvent(this.searchBox.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        distinctUntilChanged(),
        tap(() => {
          this.listLoading = true;
          this.openTemplateOverlay(this.overlayTemplate, this.searchBox)
        }),
        debounce(() => interval(1000)),
        switchMap((val) => this.apiFunction(this.searchBox.nativeElement.value).pipe(finalize(() => this.listLoading = false)))
      ).subscribe((resp: any) => this.searchData = resp);
  }
  @Output() onSelect = new EventEmitter<any>();
  @Input() apiFunction: (term) => Observable<any>;
  @Input() accessorFunction: (any) => string;

  @ViewChild('loadingIcon') iconContainer;
  @ViewChild('overlayTemplate') overlayTemplate;
  @ContentChild('itemSearch', { read: ElementRef }) searchBox: ElementRef;
  @ContentChild('itemTemplate', { read: TemplateRef }) itemTemplate: TemplateRef<any>;
  @ContentChild('noItemsTemplate', { read: TemplateRef }) noItemsTemplate: TemplateRef<any>;

  searchData: Array<any> = [];
  overlayRef: OverlayRef;

  openTemplateOverlay(template: TemplateRef<any>, origin: ElementRef) {
    if (this.overLayVisible) return;

    const positionStrategy = this.overlay.position().connectedTo(origin, { originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' })


    const overlayConfig = new OverlayConfig({
      positionStrategy
    });
    overlayConfig.backdropClass = '';
    overlayConfig.hasBackdrop = true;

    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
      this.overLayVisible = false;
    });
    let tempPortal = new TemplatePortal(template, this.vCRef);
    this.overlayRef.attach(tempPortal);
    this.overLayVisible = true;
  }

  closeOverlay() {
    this.overLayVisible = false;
    this.overlayRef.dispose();
  }

  selectItem(item: any) {

  }

  ngOnInit(): void {
    // console.log('recieved function as', this.params);
    // this.apiFunction(this.params, 'sam').subscribe((val) => { this.searchData = val; console.log('resp from api fucntion', val) })
  }

}
