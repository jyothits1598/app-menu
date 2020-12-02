import { Component, ElementRef, OnInit, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, NgControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'cuisines-selector',
  templateUrl: './cuisines-selector.component.html',
  styleUrls: ['./cuisines-selector.component.scss']
})
export class CuisinesSelectorComponent implements OnInit, ControlValueAccessor {
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  cuisineformArray: FormArray;
  cuisinesList: Array<{ cuisine_id: number, cuisine_name: string }>;
  selectedcuisines: Array<number> = [];
  loading: boolean = true;
  isDisabled: boolean = false;
  showList: boolean = true;

  constructor(@Self() public controlDir: NgControl,
    private restApiService: RestApiService) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    //set up ngModel
    this.controlDir.control.validator = () => this.selectedcuisines.length ? null : { invalid: true };
    // this.controlDir.control.markAsTouched = () => this.cuisineformArray.markAsTouched();
    this.controlDir.control.updateValueAndValidity();

    this.restApiService.getDataObs(`api/stores/cuisines`).pipe(finalize(() => this.loading = false)).subscribe(
      (response) => {
        if (response && response['success'] && response['data']) {
          this.cuisineformArray = new FormArray(response.data.map(cuisine => new FormControl(this.selectedcuisines.includes(cuisine.cuisine_id) ? true : false)));
          this.cuisinesList = response.data;
        }
        this.checkDisable();
      }
    )
  }

  handleChange(id: number, selected: boolean) {
    if (selected) this.selectedcuisines.push(id);
    else this.selectedcuisines = this.selectedcuisines.filter(cuisineId => cuisineId != id);
    this.onChange(this.selectedcuisines);
    this.checkDisable();
    this.onTouched();
  }

  checkDisable() {
    if (this.selectedcuisines.length > 4) {
      this.cuisineformArray.controls.forEach(c => { if (!c.value) c.disable() });
      this.isDisabled = true;
    } else {
      if (this.isDisabled) {
        this.cuisineformArray.controls.forEach(c => { if (!c.value) c.enable() });
        this.isDisabled = false;
      }
    }
  }

  // ControlValueAccessor
  onChange = (value) => { };
  onTouched: () => {};

  writeValue(obj: any): void {
    this.selectedcuisines = obj || [];
    if (this.cuisinesList) {
      for (let i = 0; i < this.cuisinesList.length; i++) {
        if (this.selectedcuisines.includes(this.cuisinesList[i].cuisine_id)) this.cuisineformArray.at(i).setValue(true);
        else this.cuisineformArray.at(i).setValue(false);
      }
      this.checkDisable()
    }
  }
  // if (this.selectedcuisines.length > 4) this.cuisineformArray.disable();

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }
}
