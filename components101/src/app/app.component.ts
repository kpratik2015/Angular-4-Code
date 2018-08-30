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
  myArr = ['Hello','World','Wassup','?']


  // to add intellisense and typecheck we can do: onFavoriteChange(eventArgs: { newValue boolean })
  // also achievable through interface
  onFavoriteChange(eventArgs: FavoriteChangedEventArgs) {
    console.log("Favorite changed: ", eventArgs);
  }
}
