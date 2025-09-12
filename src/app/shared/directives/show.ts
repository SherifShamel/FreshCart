import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appShow]',
})
export class Show implements OnInit {
  constructor() {}
  ngOnInit(): void {
    console.log('hello from log directive');
  }
}
