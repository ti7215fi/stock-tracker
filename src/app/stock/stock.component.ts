import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getTrend, Quote } from '../stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @Input() symbol = '';

  companyName$!: Observable<string>;
  quote$!: Observable<Quote>;

  constructor(private stockService: StockService) { 
  }

  ngOnInit(): void {
    this.companyName$ = this.stockService.getCompanyName(this.symbol);
    this.quote$ = this.stockService.getQuote(this.symbol);
  }

  removeStock(): void {
    this.stockService.removeStock(this.symbol);
  } 

  showArrowUp(quote: Quote): boolean {
    return getTrend(quote) === "UP";
  }

  showArrowDown(quote: Quote): boolean {
    return getTrend(quote) === "DOWN";
  }
}
