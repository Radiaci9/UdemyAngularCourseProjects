import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  ref;
  numbers: number[] = [];
  evenNumbers: number[] = [];
  oddNumbers: number[] = [];

  onIncrease (num: number) {
    this.numbers.push(num);
    if (num % 2) this.evenNumbers.push(num);
    else this.oddNumbers.push(num);
  }
}
