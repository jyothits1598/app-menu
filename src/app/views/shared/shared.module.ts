import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { BtnIconDirective } from './directives/btn-icon.directive';
import { FilterPipe } from 'src/app/_helpers/filter-pipe';
import { IncrementalSearchComponent } from './components/incremental-search/incremental-search.component';



@NgModule({
  declarations: [NotFoundComponent, BtnIconDirective, FilterPipe, IncrementalSearchComponent],
  imports: [
    CommonModule
  ],
  exports: [BtnIconDirective, FilterPipe, IncrementalSearchComponent]
})
export class SharedModule { }
