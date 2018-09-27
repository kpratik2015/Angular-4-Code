import { AbstractControl, ValidationErrors } from "@angular/forms";
import { controlNameBinding } from "@angular/forms/src/directives/reactive_directives/form_control_name";

// UsernameValidators.cannotContainSpace // now possible due to static

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0) 
            return { cannotContainSpace: true };
            // return { minLength: {
            //     requiredLength: 10,
            //     actualLength: control.value.length
            // } }
        return null
    }
}