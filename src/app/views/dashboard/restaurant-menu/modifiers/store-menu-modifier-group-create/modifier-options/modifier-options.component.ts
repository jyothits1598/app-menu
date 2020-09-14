import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer2, AfterViewInit, Self, OnDestroy, forwardRef } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl, NG_VALUE_ACCESSOR, NgControl, NG_VALIDATORS } from '@angular/forms';
import { ExcludeSpaceValidator, PriceValidator } from 'src/app/_helpers/validators';
import { ModifierOption } from 'src/app/_models/store-menu-modifier';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modifier-options',
  templateUrl: './modifier-options.component.html',
  styleUrls: ['./modifier-options.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModifierOptionsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ModifierOptionsComponent),
      multi: true,
    }
  ]
})
export class ModifierOptionsComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  onChange: any;
  onTouched: any;
  formChangeSubs: Subscription;
  _options: FormArray = new FormArray([]);

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.formChangeSubs = this._options.valueChanges.subscribe((val) => this.onChange(val));
  }

  writeValue(obj: Array<ModifierOption>): void {
    if (obj) {
      obj.forEach(modOpt => this.addOption(modOpt))
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  validate(c: FormControl) {
    return this._options.valid ? null : { invalid: true }
  }

  @ViewChildren('optionElement') optElems: QueryList<ElementRef>;

  get options(): ModifierOption {
    return this._options.value;
  }


  addOption(option: ModifierOption = null) {
    let fgroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, ExcludeSpaceValidator()],),
      price: new FormControl(null, [Validators.required, PriceValidator()])
    });
    this._options.push(fgroup);
    if (option) fgroup.patchValue(option);
    this._options.updateValueAndValidity();
  }

  userAddOption() {
    if (this._options.length > 0) {
      let val = this._options.at(this._options.length - 1).value;

      //if user attempts to add two empty options
      if (!(val.name || val.price)) {
        this.renderer.addClass(this.optElems.last.nativeElement, 'new-highlight')
        setTimeout(() => {
          this.renderer.removeClass(this.optElems.last.nativeElement, 'new-highlight')
        }, 1100);
        return;
      } else this.addOption();
    }
  }

  deleteOption(index: number) {
    if (this._options.length > 1) this._options.removeAt(index);
  }

  getNameError(control: AbstractControl) {
    if (control.invalid && control.touched) {
      if (Object.keys(control.errors)[0] === 'required') return 'Please enter option name'
      if (Object.keys(control.errors)[0] === 'OnlySpace') return 'Option name is invalid'
    }
    else return "null";
  }

  getPriceError(control: AbstractControl) {
    if (control.invalid && control.touched) {
      if (Object.keys(control.errors)[0] === 'required') return 'Please enter option price'
      else return 'Option price is invalid'
    }
    else return "null";
  }

  ngOnInit(): void {
  }

    
  ngOnDestroy(): void {
    this.formChangeSubs.unsubscribe();
  }

}
