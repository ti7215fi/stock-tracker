import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sentiment } from '../core/stock.model';
import { StockService } from '../core/stock.service';

@Injectable({
  providedIn: 'root'
})
export class SentimentResolver implements Resolve<Sentiment[]> {

  constructor(private stockService: StockService) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<Sentiment[]> {
    const symbol = route.paramMap.get('symbol');
    if (symbol !== null) {
      return this.stockService.getSentimentData(symbol);
    }
    return of([])
  }
}
