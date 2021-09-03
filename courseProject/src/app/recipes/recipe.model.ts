import { v4 as uuidv4 } from 'uuid';

import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public id: string;
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[] = []
  ) {
    this.id = uuidv4();
  }
}