import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  actToInactCount: number;
  inactToActCount: number;

  constructor(private counterService: CounterService) {
    counterService.actToInactCountUpdated.subscribe(
      (newCount) => {
        this.actToInactCount = newCount
      }
    )
    counterService.inactToActCountUpdated.subscribe(
      (newCount) => {
        this.inactToActCount = newCount
      }
    )
  }

  ngOnInit () {
    this.actToInactCount = this.counterService.actToInactCount;
    this.inactToActCount = this.counterService.inactToActCount;
  }
}
