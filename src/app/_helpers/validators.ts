import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

export function MinNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return (<FormArray>control).length ? null : { 'MinimumSelection': "Minimum selection condition is not met" };
    };
}

export function ExcludeSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return control.value && control.value.trim().length ? null : { 'OnlySpace': true };
    };
}

export function PriceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let parsed = parseFloat(control.value);
        if (parsed !== parsed || parsed < 0) { return { 'Invalid': true }; }
        else return null;
    };
}
