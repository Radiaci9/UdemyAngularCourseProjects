import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  isEdit = false;
  recipe: Recipe;
  recipeForm: FormGroup;
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'imagePath': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'ingredients': new FormArray([]),
    })
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.isEdit = true
          this.recipe = this.recipeService.getRecipeById(params['id'])
          if (this.isRecipeValid('../../')) {
            let ingredientForms = (<FormArray>this.recipeForm.get('ingredients'));
            if (this.recipe.ingredients.length) {
              this.recipe.ingredients.forEach((ingredient) => {
                (<FormArray>this.recipeForm.get('ingredients')).push(this.createIngredient(ingredient))
              })
            }
            (<FormArray>this.recipeForm.get('ingredients'))
            this.recipeForm.patchValue({
              'name': this.recipe.name,
              'imagePath': this.recipe.imagePath,
              'description': this.recipe.description,
            })
          }
        } 
      }
    )
  }

  onSubmit () {
    const { value } = this.recipeForm;
    if (!value.name) return;

    if (!this.isEdit) {
      const newIngredients = value.ingredients.map((ingredient) => new Ingredient(ingredient.name, ingredient.amount));
      this.recipeService.addRecipe(new Recipe(value.name, value.imagePath, value.description, newIngredients));
    } else {
      const newIngredients = value.ingredients.map((ingredient) => {
        if (!ingredient.id) return new Ingredient(ingredient.name, ingredient.amount)
        // return (<Ingredient>ingredient);
        const oldIngredients = this.recipe.ingredients.find((rIngredient) => rIngredient.id = ingredient.id);
        oldIngredients.name = ingredient.name;
        oldIngredients.amount = ingredient.amount;
        return oldIngredients;
      });
      this.recipe.name = value.name;
      this.recipe.description = value.description;
      this.recipe.imagePath = value.imagePath;
      this.recipe.ingredients = newIngredients;

      this.recipeService.updateRecipe(this.recipe)
      this.isEdit = false;
    }
    this.onCancel();
  }

  onClear () {
    this.recipeForm.reset()
  }

  onCancel () {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  
  isRecipeValid (path: string = '../') {
    if (!this.recipe) {
      this.router.navigate([path]);
      return false;
    }
    return true
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  createIngredient (ingredient?: Ingredient | null) {
    return new FormGroup({
      'name': new FormControl(ingredient?.name || null, [Validators.required]),
      'amount': new FormControl(ingredient?.amount || 1, [Validators.required, Validators.min(1)]),
      'id': new FormControl(ingredient?.id || null)
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.createIngredient())
  }

  onDeleteIngredient (index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}
