export interface ToastContent {
  text: string;
}

export interface ToastOptions {
  className?: string;
  delay?: number;
}

export type Toast = ToastContent & ToastOptions;
