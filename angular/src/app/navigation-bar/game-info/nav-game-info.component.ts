import { Component, OnDestroy } from '@angular/core';
import { GameInfo } from '../../model/events';
import { CurrentGameService } from '../../ongoing-game/current-game.service';
import { Deck } from '../../model/deck';
import { NgbOffcanvas, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { GameFormComponent } from '../../shared/game-form/game-form.component';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'shpp-game-info',
    templateUrl: './nav-game-info.component.html',
    standalone: true,
    imports: [TranslocoModule, NgIf, NgbTooltip, GameFormComponent]
})
export class NavGameInfoComponent implements OnDestroy {

  currentGameInfo?: GameInfo | null;
  private subscription: Subscription;

  constructor(private currentGameService: CurrentGameService,
              private offcanvaseService: NgbOffcanvas) {
    this.subscription = this.currentGameService.gameInfo$
    .subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  openEdit(content: any): void {
    this.offcanvaseService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'})
      .result
      .then((result: {name: string, deck: Deck}) => {
        this.currentGameService.setDeck(result.deck);
        this.currentGameService.renameGame(result.name);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
