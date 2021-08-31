import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() increase = new EventEmitter<number>();
  @Output() stop = new EventEmitter();
  lastNum = 1;
  ref;

  constructor() { }

  ngOnInit(): void {
  }

  onStart () {
    console.log(this.ref)
    if (this.ref) return;
    this.ref = setInterval(() => {
      
      this.increase.emit(this.lastNum);
      console.log(this.lastNum);
      this.lastNum++;
    }, 1000);
  }

  onStop () {
    if (this.ref) {
      clearInterval(this.ref);
      this.ref = null;
    }
  }

  ngOnDestroy () {
    if (this.ref) clearInterval(this.ref);
  }
}