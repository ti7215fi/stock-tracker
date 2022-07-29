import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuoteResponse, SearchResponse, SentimentResponse } from './finnhub';
import { Month, Quote, Sentiment } from './stock';

@Injectable({
  providedIn: 'root'
})
export class FinnhubApiService {

  private static BASE_URI = 'https://finnhub.io/api/v1'

  constructor(
    private http: HttpClient
  ) { }

  fetchQuote(stockSymbol: string): Observable<Quote> {
    const uri = this.buildUri(`quote?symbol=${stockSymbol}`)
    return this.http.get<QuoteResponse>(uri).pipe(
      map((response) => {
        return new Quote(
          response.dp,
          response.o,
          response.c,
          response.h
        )
      })
    )
  }

  fetchCompanyName(stockSymbol: string): Observable<string> {
    const uri = this.buildUri(`search?q=${stockSymbol}`)
    return this.http.get<SearchResponse>(uri).pipe(
      map((response: SearchResponse) => {
        return this.findSuitableCompanyName(stockSymbol, response);
      })
    )
  }

  fetchSentimentData(symbol: string): Observable<Sentiment[]> {
    const now = new Date();

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
            item.change,
            item.mspr
          )
        })
      }),
      catchError((error) => {
        console.error(error);
        return [];
      })
    )
  }

  private findSuitableCompanyName(symbol: string, response: SearchResponse): string {
    if (response.count <= 0) {
      return 'Unkown';
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
