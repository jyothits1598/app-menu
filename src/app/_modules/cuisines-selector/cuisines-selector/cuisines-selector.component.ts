import { Component, ElementRef, OnInit, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, NgControl } from '@angular/forms';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'cuisines-selector',
  templateUrl: './cuisines-selector.component.html',
  styleUrls: ['./cuisines-selector.component.scss']
})
export class CuisinesSelectorComponent implements OnInit, ControlValueAccessor {
  cuisineformArray: FormArray;
  cuisinesList: Array<{ cuisine_id: number, cuisine_name: string }>;
  selectedcuisines: Array<number> = [];
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  showList: boolean = true;

  constructor(@Self() public controlDir: NgControl,
    private restApiService: RestApiService,
    private renderer: Renderer2) {
    this.controlDir.valueAccessor = this;
  }

  getHeight() {
    if(this.container){
      console.log(this.container.nativeElement.scrollHeight+'px')
      if (this.showList) return this.container.nativeElement.scrollHeight + 'px';
      else return '0px';
    }
  }

  ngOnInit(): void {
    //set up ngModel
    this.controlDir.control.validator = () => this.selectedcuisines.length ? null : { invalid: true };
    // this.controlDir.control.markAsTouched = () => this.cuisineformArray.markAsTouched();
    this.controlDir.control.updateValueAndValidity();

    this.restApiService.getData(`api/stores/cuisines`, (response) => {
      if (response && response['success'] && response['data']) {
        this.cuisineformArray = new FormArray(response.data.map(cuisine => new FormControl(this.selectedcuisines.includes(cuisine.cuisine_id) ? true : false)));
        this.cuisinesList = response.data;
        // this.selectedCuisines = new FormArray(this.)
      }
    });
  }

  handleChange(id: number, selected: boolean) {
    if (selected) this.selectedcuisines.push(id);
    else this.selectedcuisines = this.selectedcuisines.filter(cuisineId => cuisineId != id);
    this.onChange(this.selectedcuisines);
    this.onTouched();
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
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }
}
