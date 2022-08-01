import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Stock } from '../../core/stock.model';
import { StockService } from '../../core/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  get stocks(): Stock[] {
    return this.stockService.stocks;
  }

  readonly trackBySymbol: TrackByFunction<Stock> = (idx, stock) => stock.symbol;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

}
