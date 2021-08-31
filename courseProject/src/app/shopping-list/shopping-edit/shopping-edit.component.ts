import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addNewIngredient = new EventEmitter<Ingredient>();

  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd () {
    const nameValue = this.nameInputRef.nativeElement.value;
    const amountValue = this.amountInputRef.nativeElement.value;
    if (!nameValue) return;
    this.addNewIngredient.emit(new Ingredient(nameValue, amountValue));
  }
}
