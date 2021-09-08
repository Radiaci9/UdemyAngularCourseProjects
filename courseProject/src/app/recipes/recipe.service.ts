import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe 1',
      'A test description 1',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potato', 1),
      ]
    ),
    new Recipe(
      'A test recipe 2',
      'A test description 2',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'
    ),
    new Recipe(
      'A test recipe 3',
      'A test description 3',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'
    )
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList (ingredients: Ingredient[]) {
    if (!ingredients.length) return;
    this.slService.addNewIngredients(ingredients);
  }
  
  getRecipeById (id: string) {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addRecipe (recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  updateRecipe (updatedRecipe: Recipe) {
    this.recipes = this.recipes.map((recipe) => {
      if (recipe.id === updatedRecipe.id) return updatedRecipe;
      return recipe;
    })
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipeById (id: string) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.recipesChanged.next(this.recipes.slice());
  }
  
}
