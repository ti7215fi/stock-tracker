import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Quote } from 'src/app/core/stock.model';
import { StockService } from 'src/app/core/stock.service';



@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss']
})
export class QuoteCardComponent implements OnInit {

  @Input() symbol = '';

  quote$: Observable<Quote> = of(new Quote());

  constructor(private stockService: StockService) { 
  }

  ngOnInit(): void {
    this.quote$ = this.stockService.getQuote(this.symbol).pipe(
      map(quote => quote ?? new Quote())
    );
  }

  removeStock(): void {
    this.stockService.removeStock(this.symbol);
  } 
}
