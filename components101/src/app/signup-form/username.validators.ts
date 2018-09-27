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

    static shouldBeUnique(control: AbstractControl) : ValidationErrors | null {
        // simulate
        setTimeout(() => {
            if (control.value === 'pratik')
                return { shouldBeUnique : true };
            return null;
        }, 2000) // arrow function syntax with no params. This is async. 
        
        return null; // this is wrong as it will always return null. Just for solving compilation erorr it's not good.
    }
}