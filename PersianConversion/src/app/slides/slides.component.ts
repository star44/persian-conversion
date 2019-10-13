import { Component } from '@angular/core';

@Component({
  selector: 'persian-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent {
  title: string = 'Slideshow';

  constructor() {
    console.log('hello slideshow!');
  }
}
