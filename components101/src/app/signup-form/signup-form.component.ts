import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  /*
  AbstractControl is parent of FormControl and FormGroup. 

  ERROR: Can't bind to formGroup since it isn't a known property of 'form'
  SOLUTION: ReactiveFormsModule in app.module.ts

  Validators has static members like required, etc.
  */

  /*
  AsyncValidatorFn is interface. It takes AbstractControl as param. 
  Return type is Promise or Observable

  When you read docs,
  Promise<ValidationErrors|null> imply that function returns either:
  1. ValidationErrors or
  2. null

  */

  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        UsernameValidators.cannotContainSpace
      ],
      UsernameValidators.shouldBeUnique),
      password: new FormControl('',Validators.required)
    }),
    // 'user-name' : new FormControl(),
  });

  login() {
    // let isValid = authService.login(this.form.value); // simulating
    // if (!isValid) {
    //   this.form.setErrors(
    //     { invalidLogin: true }
    //   ) // setting errors on form level.
    //   // this.username.setErrors // on field level.

    this.form.setErrors({
      invalidLogin: true
    });
    }
  

  get username() {
    return this.form.get('account.username');
  }


}
