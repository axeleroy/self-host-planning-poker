import { Component, HostBinding } from '@angular/core';
import { ToastService } from './toast.service';


@Component({
	selector: 'shpp-toasts',
	template: `
		<ngb-toast
			*ngFor="let toast of toastService.toasts"
			[class]="toast.className"
			[autohide]="true"
			[delay]="toast.delay || 5000"
			(hidden)="toastService.remove(toast)"
		>
			{{ toast.text }}
		</ngb-toast>
	`,
})
export class ToastsContainerComponent {
  @HostBinding('class') classAttr = 'toast-container position-fixed top-0 end-0 p-3';
  @HostBinding('style') styleAttr = 'z-index: 1200';

	constructor(public toastService: ToastService) {}
}
