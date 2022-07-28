import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  private get isEnabled(): boolean {
    return !environment.production
  }

  constructor() { }

  log(msg: string) {
    if (this.isEnabled) {
      console.log(msg);
    }
  }
}
