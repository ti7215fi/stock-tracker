import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from 'src/app/core/stock';
import { StockService } from 'src/app/core/stock.service';



@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @Input() symbol = '';

  quote$!: Observable<Quote>;

  constructor(private stockService: StockService) { 
  }

  ngOnInit(): void {
    this.quote$ = this.stockService.getQuote(this.symbol);
  }

  removeStock(): void {
    this.stockService.removeStock(this.symbol);
  } 
}
