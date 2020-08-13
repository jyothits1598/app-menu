import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { BtnIconDirective } from './directives/btn-icon.directive';
import { FilterPipe } from 'src/app/_helpers/filter-pipe';
import { IncrementalSearchComponent } from './components/incremental-search/incremental-search.component';
import { FocusOnLoadDirective } from './directives/focus-on-load.directive';



@NgModule({
  declarations: [NotFoundComponent, BtnIconDirective, FilterPipe, IncrementalSearchComponent, FocusOnLoadDirective],
  imports: [
    CommonModule
  ],
  exports: [BtnIconDirective, FilterPipe, IncrementalSearchComponent, FocusOnLoadDirective]
})
export class SharedModule { }
