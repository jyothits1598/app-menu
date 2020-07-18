import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SecondFormsComponent } from './second-forms.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
// import { NgxGooglePlacesAutocompleteModule } from '@codious/ngx-google-places-autocomplete';


const routes: Routes = [
  {
    path: '',
    component: SecondFormsComponent
  },
]
const secondformRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [SecondFormsComponent],
  imports: [
    CommonModule,
    secondformRouting,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule
  ]
})
export class SecondFormsModule { }
