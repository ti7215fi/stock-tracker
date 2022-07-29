import { Component } from '@angular/core';
import { Stock } from './stock';
import { StockService } from './stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stock-tracker';
  
  get stocks(): Stock[] {
    return this.stockService.stocks;
  }

  constructor(private stockService: StockService) {}

}
