import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

export function MinNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return (<FormArray>control).length ? null : { 'MinimumSelection': "Minimum selection condition is not met" };
    };
}