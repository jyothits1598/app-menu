import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SecondFormsComponent } from './second-forms.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { TimeAvailabilityModule } from 'src/app/_modules/time-availability/time-availability.module';
import { SharedModule } from '../../shared/shared.module';
import { CuisinesSelectorModule } from 'src/app/_modules/cuisines-selector/cuisines-selector.module';
import { StoreLogoComponent } from './store-logo/store-logo.component';
import { FileuploadModule } from 'src/app/_modules/fileupload/fileupload.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImgCropperModule } from 'src/app/_modules/img-cropper/img-cropper.module';
// import { NgxGooglePlacesAutocompleteModule } from '@codious/ngx-google-places-autocomplete';


const routes: Routes = [
  {
    path: '',
    component: SecondFormsComponent
  },
]
const secondformRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [SecondFormsComponent, StoreLogoComponent],
  imports: [
    CommonModule,
    secondformRouting,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,
    TimeAvailabilityModule,
    SharedModule,
    CuisinesSelectorModule,
    FileuploadModule,
    ImgCropperModule
  ]
})
export class SecondFormsModule { }
