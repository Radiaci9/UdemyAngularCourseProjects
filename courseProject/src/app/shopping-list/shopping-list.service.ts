import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients () {
    return this.ingredients.slice();
  }

  addNewIngredient (ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
  
  addNewIngredients (newIngredients: Ingredient[]) {
    // this.ingredients = this.ingredients.concat(newIngredients);
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
