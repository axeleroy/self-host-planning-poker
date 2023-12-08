import { Component, OnDestroy } from '@angular/core';
import { CurrentGameService } from '../../ongoing-game/current-game.service';
import { GameInfo } from '../../model/events';
import { Subscription } from 'rxjs';
import { ToastService } from '../../shared/toast/toast.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { QrCodeModalContentComponent } from "./qr-code-modal-content/qr-code-modal-content.component";

@Component({
    selector: 'shpp-game-name',
    templateUrl: './nav-game-name.component.html',
    standalone: true,
    imports: [TranslocoDirective, NgIf, NgbTooltip]
})
export class NavGameNameComponent implements OnDestroy {

  currentGameInfo: GameInfo | null | undefined;
  private gameInfoSubscription: Subscription;

  constructor(private currentGameService: CurrentGameService,
              private toastService:  ToastService,
              private clipboard: Clipboard,
              private modalService: NgbModal,
              private transloco: TranslocoService) {
    this.gameInfoSubscription = this.currentGameService.gameInfo$
    .subscribe((gameInfo) => this.currentGameInfo = gameInfo);
  }

  ngOnDestroy(): void {
    this.gameInfoSubscription.unsubscribe();
  }

  copyLink(): void {
    this.clipboard.copy(this.getUrl());
    this.toastService.show(
      this.transloco.translate('navbar.gameName.copy-toast')
    )
  }

  displayQrCode(): void {
    const modalRef = this.modalService.open(QrCodeModalContentComponent);
    modalRef.componentInstance.url = this.getUrl();
  }

  private getUrl(): string {
    return window.location.toString();
  }
}
