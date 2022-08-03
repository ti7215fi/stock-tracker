import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  protected get isEnabled(): boolean {
    return !environment.production
  }

  constructor() { }

  log(message?: any, ...optionalParams: any[]) {
    if (this.isEnabled) {
      console.log(message, optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    if (this.isEnabled) {
      console.error(message, optionalParams);
    }
  }

}
