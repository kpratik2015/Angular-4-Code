import { Directive, HostListener, ElementRef, Input } from '@angular/core';

// hostlistener lets us subscribe to the events raised by dom
// element which has this attribute

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  @Input('format') format;

  // ElementRef is a service defined in agular that gives us 
  // access to a dom element
  constructor(private el: ElementRef) { }

  // @HostListener('focus')  onFocus() {
  //   console.log("OnFocus");
  // }

  //nativeElement gives access to actual dom object
  @HostListener('blur')  onBlur() {
    let value:string = this.el.nativeElement.value;

    if(this.format == 'lowercase')
      this.el.nativeElement.value = value.toLowerCase();
    else
      this.el.nativeElement.value = value.toUpperCase();
  }
  

}
