import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { FinnhubApiService } from './finnhub-api.service';
import { Logger } from './logger.service';
import { Quote, Stock } from './stock.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  get stocks(): Stock[] {
    return this.storage.getItem('stocks') ?? [];
  }

  constructor(
    private storage: StorageService,
    private logger: Logger,
    private finnhubApi: FinnhubApiService
  ) { }

  addStock(stock: Stock) {
    const stocks = [...this.stocks];
    const exists = (item: Stock) => item.symbol === stock.symbol;

    if (!stocks.some(exists)) {
      stocks.push(stock);
      this.storage.saveItem('stocks', stocks)
    } else {
      this.logger.log(`Stock with symbol "${stock.symbol}" already exists!`);
    }
  }

  updateStock(updatedStock: Stock) {
    const stocks = [...this.stocks];
    const stockIndex = stocks.findIndex((item) => item.symbol === updatedStock.symbol);

    if (stockIndex !== -1) {
      stocks[stockIndex] = updatedStock;
      this.storage.saveItem('stocks', stocks);
    } else {
      this.logger.log(`Stock with symbol "${updatedStock.symbol}" doesn't exist!`);
    }
  }

  getStockBySymbol(symbol: string): Stock | null {
    const stocks = [...this.stocks];
    return stocks.find((item) => item.symbol === symbol) ?? null;
  }

  getCompanyName(symbol: string): Observable<string | null> {
    const stock = this.getStockBySymbol(symbol);

    if (!stock) {
      return of(null);
    }

    if (stock.companyName) {
      return of(stock.companyName);
    }

    return this.finnhubApi.fetchCompanyName(symbol).pipe(
      tap((n) => {
        if (n !== null) {
          stock.companyName = n;
          this.updateStock(stock);
        }
      }),
      catchError(error => {
        this.logger.error(error);
        return of(null);
      })
    );
  }

  getQuote(symbol: string): Observable<Quote | null> {
    const stock = this.getStockBySymbol(symbol);

    if (!stock) {
      return of(null);
    }

    if (stock.quote) {
      return of(stock.quote);
    }

    return this.finnhubApi.fetchQuote(symbol).pipe(
      tap((q) => {
        if (q !== null) {
          stock.quote = q;
          this.updateStock(stock);
        }
      }),
      catchError(error => {
        this.logger.error(error);
        return of(null);
      })
    )
  }

  removeStock(symbol: string): void {
    const stocks = [...this.stocks];
    const stockIndex = stocks.findIndex((item) => item.symbol === symbol);

    if (stockIndex !== -1) {
      stocks.splice(stockIndex, 1);
      this.storage.saveItem('stocks', stocks);
    } else {
      this.logger.log(`Stock with symbol "${symbol}" doesn't exist!`);
    }
  }

}
