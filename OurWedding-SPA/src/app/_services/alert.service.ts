import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  toasts: any[] = [];

  constructor() {}

  danger(body: string) {
    this.toasts.push({
      body,
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  success(toastBody: string) {
    this.toasts.push({
      body: toastBody,
      classname: 'bg-success text-light',
    });
  }

  warning(body: string) {
    this.toasts.push({
      body,
      classname: 'bg-warning text-light',
      delay: 15000,
    });
  }

  default(toastBody: string) {
    this.toasts.push({
      body: toastBody,
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
