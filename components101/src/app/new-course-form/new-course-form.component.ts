import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']

})

export class NewCourseFormComponent {
  form;
  /* Messy way */
  // form = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   contact: new FormGroup({
  //     email: new FormControl(),
  //     phone: new FormControl()
  //   }),
  //   topics : new FormArray([])
  // });

  /* Cleaner way using formbuilder */
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required], // the values we pass in array will be used as arguments to formcontrol object
      contact: fb.group({
        email: [],
        phone: []
      }),
      topics: fb.array([])
    });
  }

  addTopic(topic : HTMLInputElement) {
    // // AbstractControl is base class for FormArray as well
    // (this.form.get('topics') as FormArray)
    this.topics
    .push(
      new FormControl(topic.value)
    )
    topic.value = '';
  }

  get topics() {
    return this.form.get('topics') as FormArray;
  }

  removeTopic(topic: FormControl) {
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }
}
