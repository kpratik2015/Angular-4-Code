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

  form = new FormGroup({
    // 'user-name' : new FormControl(),
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      UsernameValidators.cannotContainSpace
    ]),
    password: new FormControl('',Validators.required)
  });

  get username() {
    return this.form.get('username');
  }


}
