import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deck, decks, decksDict, displayDeckValues } from '../../model/deck';

@Component({
  selector: 'spp-game-form',
  templateUrl: './game-form.component.html',
  styles: [
  ]
})
export class GameFormComponent implements OnInit{

  formGroup: FormGroup;
  decks = decks
  displayDeckValues = displayDeckValues

  @Input()
  name?: string;
  @Input()
  deck?: Deck;
  @Output() newDeck = new EventEmitter<{name: string, deck: Deck}>()

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(1)]],
      deck: [ decksDict['FIBONACCI'], Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.name) {
      this.formGroup.get('name')?.patchValue(this.name);
    }
    if (this.deck) {
      this.formGroup.get('deck')?.patchValue(this.deck);
    }
  }

  validate(): void {
    this.newDeck.emit(this.formGroup?.getRawValue());
  }

}
