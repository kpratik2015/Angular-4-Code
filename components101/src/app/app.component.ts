import { FavoriteChangedEventArgs } from './favorite.component';
import { Component } from '@angular/core';


/*
If we are building a reusable component,
you wanna declare this interface in your implementation and export it from your module.
*/
// interface FavoriteChangedEventArgs {
//   newValue: boolean
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  post = {
    title:"Title",
    isFavorite: true
  }
  title = 'components101'
  myObject = {
    gender: 'male',
    age: 22,
    location: 'Pune'
  }
  myArr = ['Hello','World','Wassup','?'];

  
  // to add intellisense and typecheck we can do: onFavoriteChange(eventArgs: { newValue boolean })
  // also achievable through interface
  onFavoriteChange(eventArgs: FavoriteChangedEventArgs) {
    console.log("Favorite changed: ", eventArgs);
  }

  //ngIf
  courses = [];

  // ngSwitchCase:
  viewMode = 'somethingElse';

  // ngFor:
  course_list = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
  ];

  onAdd() {
    this.myArr.push('additional');
  }
  
  onRemove(arr) {
    let index = this.myArr.indexOf(arr);
    this.myArr.splice(index, 1);
  }
}
