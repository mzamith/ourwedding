import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  toasts: any[] = [];

  constructor() {}

  danger(header: string, body: string) {
    this.toasts.push({
      header,
      body,
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  success(header: string, body: string) {
    this.toasts.push({
      header,
      body,
      classname: 'bg-success text-light',
    });
  }

  warning(header: string, body: string) {
    this.toasts.push({
      header,
      body,
      classname: 'bg-warning text-light',
      delay: 15000,
    });
  }

  default(header: string, body: string) {
    this.toasts.push({
      header,
      body,
    });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
