import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ExcludeSpaceValidator, PriceValidator } from 'src/app/_helpers/validators';

@Component({
  selector: 'app-modifier-options',
  templateUrl: './modifier-options.component.html',
  styleUrls: ['./modifier-options.component.scss']
})
export class ModifierOptionsComponent implements OnInit {

  constructor(private renderer: Renderer2) { }
  
  @ViewChildren('optionElement')  optElems: QueryList<ElementRef>;   
  @Input() set options(value) {
    
  }

  _options: FormArray = new FormArray([]);

  addOption(){
    if(this._options.length > 0){
      let val = this._options.at(this._options.length -1).value;
      if(!(val.name || val.price)) {
        this.renderer.addClass(this.optElems.last.nativeElement, 'new-highlight')
        setTimeout(() => {
          this.renderer.removeClass(this.optElems.last.nativeElement, 'new-highlight')
        }, 1100);
        return;
      }
    }
    let fgroup = new FormGroup({
      name: new FormControl(null,[Validators.required, ExcludeSpaceValidator()], ),
      price: new FormControl(null, [Validators.required, PriceValidator()])
    });
    this._options.push(fgroup);
  }

  deleteOption(index: number){
    if(this._options.length > 1) this._options.removeAt(index);
  }

  getNameError(control: AbstractControl){
    if(control.invalid && control.touched){
      if(Object.keys(control.errors)[0] === 'required') return 'Please enter option name'
      if(Object.keys(control.errors)[0] === 'OnlySpace') return 'Option name is invalid'
    }
    else return "null";
  }

  getPriceError(control: AbstractControl){
    if(control.invalid && control.touched){
      if(Object.keys(control.errors)[0] === 'required') return 'Please enter option price'
      else return 'Option price is invalid'
    }
    else return "null";

  }

  ngOnInit(): void {
    this.addOption();
  }

  debug(){
    console.log(this._options.at(0));
  }

}
