import { ArrayToConsolidatedString } from 'src/app/_helpers/string-helpers';
import { StoreMenuModifier } from 'src/app/_models/store-menu-modifier';

export class ModifierDisplay{
    modifier: StoreMenuModifier;
    optionsString: string;
    itemsString: string; 

    constructor(modifier: StoreMenuModifier){
        this.modifier = modifier;
        this.itemsString = "Dummy"
        this.optionsString = ArrayToConsolidatedString(modifier.options, 3, (option)=>option.name);
    }
}

export function ModifiersToModifierDisplay(modifiers: Array<StoreMenuModifier>) : Array<ModifierDisplay>{
    let modsDisp: Array<ModifierDisplay> = [];
    modifiers.forEach(mod => {
      modsDisp.push(new ModifierDisplay(mod))
    })
    return modsDisp;
}