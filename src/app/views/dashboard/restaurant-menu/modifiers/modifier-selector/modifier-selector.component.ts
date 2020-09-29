import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { StoreMenuModifier } from 'src/app/_models/store-menu-modifier';
import { ModifierDisplay } from '../../_models/modifier-display';

@Component({
  selector: 'app-modifier-selector',
  templateUrl: './modifier-selector.component.html',
  styleUrls: ['./modifier-selector.component.scss']
})
export class ModifierSelectorComponent implements OnInit {
  selectedModifers: Array<StoreMenuModifier> = [];
  filterTerm: string = '';

  @Input('modifiers') set modifiers(modifiers: Array<StoreMenuModifier>) {
    let modsDisp: Array<ModifierDisplay> = [];
    modifiers.forEach(mod => {
      modsDisp.push(new ModifierDisplay(mod))
    })
    this.modifierDisplay = modsDisp;
  };

  @Input('selected') set selected(selectedModifiers: Array<StoreMenuModifier>) {
    this.selectedModifers = [...selectedModifiers];
  };

  @Output() selection: EventEmitter<Array<StoreMenuModifier>> = new EventEmitter();
  @Output() canceled: EventEmitter<boolean> = new EventEmitter();
  @Output() createNew: EventEmitter<boolean> = new EventEmitter();

  modifierDisplay: Array<ModifierDisplay>;

  accessorFunction = (modDisp: ModifierDisplay) => modDisp.modifier.name;

  handleEvent(val){
    this.filterTerm = val;
  }
  constructor() { }

  handleSelection(add: boolean, modifier: StoreMenuModifier) {
    if (add) {
      this.selectedModifers.push(modifier)
    } else {
      let index = this.selectedModifers.findIndex(mod => mod === modifier);
      this.selectedModifers.splice(index, 1);
    }
  }

  isSelected(modifier: StoreMenuModifier){
    if(!this.selectedModifers) return false;
    let index = this.selectedModifers.findIndex(moddp => moddp.id === modifier.id);
    return index > -1;
  }



  ngOnInit(): void {
  }



}
