import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer2, AfterViewInit, Self, OnDestroy, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl, NG_VALUE_ACCESSOR, NgControl, NG_VALIDATORS } from '@angular/forms';
import { ExcludeSpaceValidator, PriceValidator } from 'src/app/_helpers/validators';
import { ModifierOption } from 'src/app/_models/store-menu-modifier';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

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
export class ModifierOptionsComponent implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {
  onChange: any;
  onTouched: any;
  formChangeSubs: Subscription;
  _options: FormArray = new FormArray(new Array<FormGroup>());

  constructor(private renderer: Renderer2,
    private currFormat: CurrencyPipe) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.control) this.control.markAsTouched = () => {
      this._options.markAllAsTouched();
    }
  }
  @Input() control: FormControl;

  writeValue(obj: Array<ModifierOption>): void {
    if (obj) {
      if (this.formChangeSubs) this.formChangeSubs.unsubscribe();
      this._options = new FormArray([]);
      obj.forEach(modOpt => this.addOption(modOpt))
    } else this.addOption(null);

    this.formChangeSubs = this._options.valueChanges.subscribe((val) => this.onChange(val));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  transform(val) {
    // <FormGroup>(this._options.at(25)).
  }

  markAsTouched() {
    this._options.markAllAsTouched();
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  validate(c: FormControl) {
    return this._options.valid ? null : { invalid: true }
  }

  @ViewChildren('optionElement') optElems: QueryList<ElementRef>;

  // optionAt(index: number): FormGroup {
  //   return this._options.at(index) as FormGroup
  // }

  setFormat(index: number) {
    let priceControl: AbstractControl = (<FormGroup>(this._options.at(index))).controls.price;
    if (priceControl.valid) {
      priceControl.patchValue(this.currFormat.transform(priceControl.value.replace(',', ''), '', ''));
    }
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
    } else this.addOption();
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
