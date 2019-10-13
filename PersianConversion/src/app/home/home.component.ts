import { Component } from '@angular/core';

@Component({
  selector: 'persian-conversion',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title: string = 'Home';

  constructor() {
    console.log('hello homepage!');
  }
}
