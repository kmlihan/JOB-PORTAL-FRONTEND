import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirectiveDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control![action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}
