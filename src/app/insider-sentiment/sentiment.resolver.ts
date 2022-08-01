import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FinnhubApiService } from '../core/finnhub-api.service';
import { Sentiment } from '../core/stock';

@Injectable({
  providedIn: 'root'
})
export class SentimentResolver implements Resolve<Sentiment[]> {

  constructor(private finnhubApi: FinnhubApiService) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<Sentiment[]> {
    const symbol = route.paramMap.get('symbol');
    if (symbol !== null) {
      return this.finnhubApi.fetchSentimentData(symbol);
    }
    return of([])
  }
}
