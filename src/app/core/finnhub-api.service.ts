import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuoteResponse, SearchResponse, SentimentResponse } from './finnhub-api.model';
import { Logger } from './logger.service';
import { Month, Quote, Sentiment } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class FinnhubApiService {

  private static BASE_URI = 'https://finnhub.io/api/v1'

  constructor(
    private http: HttpClient,
    private logger: Logger
  ) { }

  fetchQuote(stockSymbol: string): Observable<Quote | null> {
    const uri = this.buildUri(`quote?symbol=${stockSymbol}`);
    return this.http.get<QuoteResponse>(uri).pipe(
      map((response) => {
        return new Quote(
          response.dp,
          response.o,
          response.c,
          response.h
        )
      }),
      catchError(error => {
        this.logger.error(error);
        return of(null);
      })
    );
  }

  fetchCompanyName(stockSymbol: string): Observable<string | null> {
    const uri = this.buildUri(`search?q=${stockSymbol}`);
    return this.http.get<SearchResponse>(uri).pipe(
      map((response: SearchResponse) => {
        return this.findSuitableCompanyName(stockSymbol, response);
      }),
      catchError(error => {
        this.logger.error(error);
        return of(null);
      })
    );
  }

  fetchSentimentData(symbol: string, now: Date = new Date()): Observable<Sentiment[]> {
    const toDate = new Date(now.getFullYear(), now.getMonth(), 0);
    const to = this.formatDate(toDate);

    const fromDate = new Date(now.getFullYear(), now.getMonth() -3, 1);
    const from = this.formatDate(fromDate);
    
    const uri = this.buildUri(`stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}`);

    return this.http.get<SentimentResponse>(uri).pipe(
      map((response: SentimentResponse) => {
        return response.data.map((item) => {
          return new Sentiment(
            item.month as Month,
            item.year,
            item.change,
            item.mspr
          )
        })
      }),
      catchError((error) => {
        this.logger.error(error);
        return of([]);
      })
    );
  }

  private findSuitableCompanyName(symbol: string, response: SearchResponse): string | null {
    if (response.count <= 0) {
      return null;
    }

    if (response.count === 1) {
      return response.result[0].description;
    }

    const filteredResult = response.result.filter((item) => 
      item.symbol === symbol
    )
    return filteredResult.length ?
      filteredResult[0].description :
      response.result[0].description; 
  }

  private buildUri(resource: string): string {
    const token = environment.finnhubApiToken;
    return `${FinnhubApiService.BASE_URI}/${resource}&token=${token}`;
  }

  private formatDate(date: Date): string {
    const dateFormat = 'yyyy-MM-dd';
    return formatDate(date, dateFormat, 'en-US');
  }

}
