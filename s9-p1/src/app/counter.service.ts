import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  actToInactCount: number = 0;
  inactToActCount: number = 0;

  actToInactCountUpdated = new EventEmitter<number>();
  inactToActCountUpdated = new EventEmitter<number>();

  constructor() { }

  moveActToInact () {
    this.actToInactCount++;
    console.log(`active->inactive: ${this.actToInactCount}`)
    this.actToInactCountUpdated.emit(this.actToInactCount);
  }
  moveInactToAct () {
    this.inactToActCount++;
    console.log(`inactive->active: ${this.inactToActCount}`)
    this.inactToActCountUpdated.emit(this.inactToActCount);
  }
}
