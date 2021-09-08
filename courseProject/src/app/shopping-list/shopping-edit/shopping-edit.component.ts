import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingEditForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  editItem: Ingredient;

  constructor (private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.editingIngredientId.subscribe(
      (id: string) => {
        this.editMode = true;
        this.editItem = this.slService.getIngredientById(id);
        this.shoppingEditForm.setValue({
          'name': this.editItem.name,
          'amount': this.editItem.amount,
        })
      }
    )

    this.shoppingEditForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(1, [Validators.required, Validators.min(1)]),
    })
  }

  onSubmit () {
    const { value } = this.shoppingEditForm;
    if (!value.name) return;

    if (!this.editMode) {
      this.slService.addNewIngredient(new Ingredient(value.name, value.amount));
    } else {
      this.editItem.name = value.name;
      this.editItem.amount = value.amount;
      this.slService.updateIngredient(this.editItem)
      this.editMode = false;
    }
    this.onClear();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onClear () {
    this.shoppingEditForm.reset({
      'amount': 1,
    })
  }

  onDelete () {
    this.slService.deleteIngredientById(this.editItem.id)
    this.onClear();
    this.editMode = false;
  }
}
