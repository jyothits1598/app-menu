import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { BtnIconDirective } from './directives/btn-icon.directive';
import { FilterPipe } from 'src/app/_helpers/filter-pipe';
import { IncrementalSearchComponent } from './components/incremental-search/incremental-search.component';
import { FocusOnLoadDirective } from './directives/focus-on-load.directive';
import { ProcessingPlaceholderComponent } from './components/processing-placeholder/processing-placeholder.component';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';
import { LoadingPlaceholderDirective } from './directives/loading-placeholder.directive';



@NgModule({
  entryComponents: [LoadingPlaceholderComponent],
  declarations: [NotFoundComponent, BtnIconDirective, FilterPipe, IncrementalSearchComponent, FocusOnLoadDirective, ProcessingPlaceholderComponent, LoadingPlaceholderComponent, LoadingPlaceholderDirective],
  imports: [
    CommonModule
  ],
  exports: [BtnIconDirective, FilterPipe, IncrementalSearchComponent, FocusOnLoadDirective, ProcessingPlaceholderComponent]
})
export class SharedModule { }
