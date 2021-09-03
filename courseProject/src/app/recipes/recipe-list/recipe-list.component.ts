import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() setSelectedRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];

  constructor (private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSeleced (recipe: Recipe) {
    this.setSelectedRecipe.emit(recipe);
  }

  onNewRecipe () {
    this.router.navigate(['add'], { relativeTo: this.route })
  }
}
