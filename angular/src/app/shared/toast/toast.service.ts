import { Injectable } from '@angular/core';
import { Toast, ToastOptions } from './toast-model';

@Injectable({
  providedIn: 'any'
})
export class ToastService {

  toasts: Toast[] = [];

  show(text: string, options: ToastOptions = {}) {
    this.toasts.push({ text: text, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
