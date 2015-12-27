import { 
  Directive,
  Host,
  SkipSelf,
  ElementRef
} from 'angular2/core';

import {DOM} from 'angular2/src/platform/dom/dom_adapter';


@Directive({
  selector: '[fix-scrolling]',
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class FixScrolling {
  
  private body: HTMLBodyElement;
  
  constructor(private elementRef: ElementRef) {
    //this.body = DOM.query('body');
    this.setHeight();
  }
  
  onResize(event: Event) {
    this.setHeight();
  }
  
  private setHeight() {
    ///let height = this.body.getBoundingClientRect().height - 50;
    //DOM.setStyle(this.elementRef.nativeElement, 'height', `${ height }px`);
  }
}