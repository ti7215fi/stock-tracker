import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { Stock } from './stock';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private storage: StorageService,
    private logger: Logger
  ) { }

  addStock(stock: Stock) {
    const stocks: Stock[] = this.storage.getItem('stocks') ?? [];
    const exists = (item: Stock) => item.symbol === stock.symbol;

    if (!stocks.some(exists)) {
      stocks.push(stock);
      this.storage.saveItem('stocks', stocks)
    } else {
      this.logger.log(`Stock with symbol "${stock.symbol}" already exists!`);
    }
  }
}
