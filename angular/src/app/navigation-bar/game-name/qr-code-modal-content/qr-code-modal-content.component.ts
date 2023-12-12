import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslocoDirective } from "@ngneat/transloco";
import QRCode from "qrcode"

@Component({
  selector: 'shpp-qr-code-modal-content',
  standalone: true,
  templateUrl: './qr-code-modal-content.component.html',
  imports: [
    TranslocoDirective
  ]
})
export class QrCodeModalContentComponent implements AfterViewInit {
  activeModal = inject(NgbActiveModal);
  @Input() private url?: string;

  @ViewChild('qrCanvas')
  private qrCanvas?: ElementRef;

  ngAfterViewInit(): void {
    if (this.url) {
      QRCode.toCanvas(this.qrCanvas?.nativeElement,
        this.url, () => {});
    }
  }
}
