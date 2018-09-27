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

    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        
        /*
        CONSTRUCTOR OF PROMISE:
        exector: (resolve: ...)
        reject: (reason?: any) => ...)

        Description:
        We have 3 arrow functions.    
        First one represents that it takes etiher parameter of:
        1. value? (optional) or
        2. PromiseLike<T>
        and returns void. resolve is the function.

        Second one takes param of type reason which is optional
        and returns void. Type of reason is any. reject is the function.

        Lastly,

        executor: (resolve, reject) => void



        */
        return new Promise( (resolve, reject) => {
           // we use resolve to return a value to the consumer of this promise.
           // so when async operation completes, we wanna give the consumer some value.
           // so we use the resolve function. So instead of calling return true. We call resolve true.
           // resolve(true);

           // in case of failure we go for reject. We can optionally specify reason
           // reject()

            // simulate
            setTimeout(() => {
                if (control.value === 'pratik')
                    resolve( { shouldBeUnique : true } );
                else resolve(null); 
            }, 2000); // arrow function syntax with no params. This is async. 

        });
        
        // return null; // this is wrong as it will always return null. Just for solving compilation erorr it's not good.
    }
}