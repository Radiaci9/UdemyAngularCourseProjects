import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipeById(this.route.snapshot.params['id']);
    this.isRecipeValid();
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipeById(params['id']);
        this.isRecipeValid();
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  isRecipeValid () {
    if (!this.recipe) {
      this.router.navigate(["../"]);
    }
  }

  onDelete () {
    this.recipeService.deleteRecipeById(this.recipe.id)
    this.router.navigate(["../"]);
  }
}
