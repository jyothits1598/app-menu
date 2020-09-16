import { Component, Input, OnInit } from '@angular/core';
import { StoreMenuModifier } from 'src/app/_models/store-menu-modifier';

@Component({
  selector: 'app-modifier-summary',
  templateUrl: './modifier-summary.component.html',
  styleUrls: ['./modifier-summary.component.scss']
})
export class ModifierSummaryComponent implements OnInit {

  constructor() { }

  @Input() modifiers: Array<StoreMenuModifier>;

  ngOnInit(): void {
  }

}
