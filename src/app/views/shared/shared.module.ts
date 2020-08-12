import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { BtnIconDirective } from './directives/btn-icon.directive';
import { FilterPipe } from 'src/app/_helpers/filter-pipe';



@NgModule({
  declarations: [NotFoundComponent, BtnIconDirective, FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [BtnIconDirective, FilterPipe]
})
export class SharedModule { }
