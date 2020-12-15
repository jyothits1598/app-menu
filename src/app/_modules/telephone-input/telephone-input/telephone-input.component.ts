import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as intlTelInput from 'intl-tel-input';
// import * as intlTelInput from 'intl-tel-input';


@Component({
  selector: 'telephone-input',
  templateUrl: './telephone-input.component.html',
  styleUrls: [
    './telephone-input.component.scss',
    '/node_modules/intl-tel-input/build/css/intlTelInput.css',
  ]
})
export class TelephoneInputComponent implements AfterViewInit {
  intlTelInput: intlTelInput.Plugin;
  @ViewChild('inputElem', { read: ElementRef }) inputElem: ElementRef;
  constructor() { }
  ngAfterViewInit(): void {
    this.intlTelInput = intlTelInput(this.inputElem.nativeElement);
  }

  ngOnInit(): void {

  }

}
