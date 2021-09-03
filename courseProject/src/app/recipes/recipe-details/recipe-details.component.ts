import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor (private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params: Params) => this.recipe = this.recipeService.getRecipeById(params['id'])
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
