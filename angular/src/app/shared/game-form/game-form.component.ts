import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Deck, decks, decksDict, displayDeckValues } from '../../model/deck';
import { TranslocoRootModule } from '../../transloco-root.module';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'shpp-game-form',
  templateUrl: './game-form.component.html',
  imports: [ CommonModule, ReactiveFormsModule, TranslocoRootModule ]
})
export class GameFormComponent implements OnInit{

  formGroup: FormGroup;
  decks = decks
  displayDeckValues = displayDeckValues

  @Input()
  name?: string;
  @Input()
  deck?: string;
  @Output() gameOutput = new EventEmitter<{name: string, deck: Deck}>();

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: [ '', [ Validators.required, Validators.minLength(1) ]],
      deck: [ decksDict['FIBONACCI'], Validators.required ]
    });
  }

  ngOnInit(): void {
    if (this.name) {
      this.formGroup.get('name')?.patchValue(this.name);
    }
    if (this.deck) {
      this.formGroup.get('deck')?.patchValue(decksDict[this.deck]);
    }
  }

  validate(): void {
    this.gameOutput.emit(this.formGroup?.getRawValue());
  }

  isNewGame(): boolean {
    return !this.name && !this.deck;
  }

}
