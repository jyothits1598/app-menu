import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as intlTelInput from 'intl-tel-input';
// import * as intlTelInput from 'intl-tel-input';


@Component({
  selector: 'app-telephone-input',
  templateUrl: './telephone-input.component.html',
  styleUrls: ['./telephone-input.component.scss']
})
export class TelephoneInputComponent implements OnInit {
  intlTelInput: intlTelInput.Plugin;
  @ViewChild('inputElem', { read: ElementRef }) inputElem: ElementRef;
  constructor() { }

  ngOnInit(): void {
    
  }

}
