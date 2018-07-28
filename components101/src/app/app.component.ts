import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Hey {{ myObject.location }}</h1>
  
  <ul>
    <li *ngFor = "let arr of myArr"> {{ arr }} </li>  
  </ul>
  
  <ol>
    <li *ngIf="myArr"> Yeah I exist </li>
    <li *ngIf="!myArr"> Yeah I don't exist </li>
    <li *ngIf="myArr == 'something'"> It does not equal so won't show </li>
    <li *ngIf="!myArr; else otherTmpl"> It does not equal so won't show </li>

    <ng-template #otherTmpl> No, I do. </ng-template>

    <div *ngIf="myArr; then templ1 else templ2">Will not get shown here so don't insert anything </div>
    
    <ng-template #templ1> <p>Template 1</p> </ng-template>
    <ng-template #templ2> <p>Template 2</p> </ng-template>

  </ol>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'components101'
  myObject = {
    gender: 'male',
    age: 22,
    location: 'Pune'
  }
  myArr = ['Hello','World','Wassup','?']
  ;
}
