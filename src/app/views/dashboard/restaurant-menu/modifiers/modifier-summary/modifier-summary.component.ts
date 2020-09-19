import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreMenuModifier } from 'src/app/_models/store-menu-modifier';

@Component({
  selector: 'app-modifier-summary',
  templateUrl: './modifier-summary.component.html',
  styleUrls: ['./modifier-summary.component.scss']
})
export class ModifierSummaryComponent implements OnInit {

  constructor() { }

  @Input() modifiers: Array<{expanded: boolean, StoreMenuModifier}>;
  @Output() edit = new EventEmitter<StoreMenuModifier>();
  @Output() remove = new EventEmitter<StoreMenuModifier>();
  
  ngOnInit(): void {
  }

}
