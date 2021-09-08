import { v4 as uuidv4 } from 'uuid';

export class Ingredient {
  id: string;
  constructor(public name: string, public amount: number) {
    this.id = uuidv4();
  }
}