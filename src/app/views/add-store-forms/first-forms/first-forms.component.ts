import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-forms',
  templateUrl: './first-forms.component.html',
  styleUrls: ['./first-forms.component.scss']
})
export class FirstFormsComponent implements OnInit {

  constructor(
    private router: Router
  ) { console.log("first")}

  ngOnInit(): void {
    
  }

}
