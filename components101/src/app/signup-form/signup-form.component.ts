import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  */

  form = new FormGroup({
    // 'user-name' : new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });
}
