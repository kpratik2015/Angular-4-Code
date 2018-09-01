import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
  /*
  with emulated angular emulates shadow dom since most browsers don't support shadow dom
  with native a shadow-root will pop up in html code making above style only applied to the template
  To include bootstrap we need to put import bootstrap statement in above style
  */
  // encapsulation: ViewEncapsulation.Native // shouldn't be done
  // inline styles: 
  // this overwrites css of favorite.component.css because it is written after styleUrls here
  // so order matters. The one that comes last, angular picks style of that
  // styles: [
  //   ` 
  //   .glyphicon {
  //       color: green;
  //   }
  //   .glyphicon-star {
  //     background: black;
  //   }
  //   `
  // ]
})

export class FavoriteComponent {
  @Input() isFavorite: boolean;

  @Output() change = new EventEmitter();

  onClick() {
    this.isFavorite = !this.isFavorite;
    this.change.emit({ newValue: this.isFavorite }); // notifying others something has happened. Raise an event.
  }
}

export interface FavoriteChangedEventArgs {
    newValue: boolean
}