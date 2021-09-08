import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  editingIngredientId = new Subject<string>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients () {
    return this.ingredients.slice();
  }

  getIngredientById (id: string) {
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }

  deleteIngredientById (id: string) {
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== id);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addNewIngredient (ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  
  updateIngredient (updatedIngredient: Ingredient) {
    this.ingredients = this.ingredients.map((ingredient) => {
      if (ingredient.id === updatedIngredient.id) return updatedIngredient;
      return ingredient;
    })
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addNewIngredients (newIngredients: Ingredient[]) {
    // this.ingredients = this.ingredients.concat(newIngredients);
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
