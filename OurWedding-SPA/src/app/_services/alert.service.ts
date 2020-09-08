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

  success(body_: string) {
    this.toasts.push({
      body: body_,
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

  default(body_: string) {
    this.toasts.push({
      body: body_,
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
