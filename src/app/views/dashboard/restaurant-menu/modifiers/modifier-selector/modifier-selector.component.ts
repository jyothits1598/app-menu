import { Component, Input, OnInit } from '@angular/core';
import { StringHelperService } from 'src/app/services/string-helper.service';
import { StoreMenuModifier } from 'src/app/_models/store-menu-modifier';
import { ModifierDisplay } from '../../_models/modifier-display';

@Component({
  selector: 'app-modifier-selector',
  templateUrl: './modifier-selector.component.html',
  styleUrls: ['./modifier-selector.component.scss']
})
export class ModifierSelectorComponent implements OnInit {
  
  @Input() set modifiers(modifiers: Array<StoreMenuModifier>){
    let modsDisp: Array<ModifierDisplay> = [];
    modifiers.forEach(mod => {
      modsDisp.push(new ModifierDisplay(mod))
    })
    this.modifierDisplay = modsDisp;
  };

  modifierDisplay: Array<ModifierDisplay>;


  constructor() { }
  nameAccessor: (item) => string = (item: any) => item.name;
  ngOnInit(): void {
  }

}
