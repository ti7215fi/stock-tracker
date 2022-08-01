import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from '../../core/stock.model';
import { StockService } from '../../core/stock.service';

@Component({
  selector: 'app-track-stock-form',
  templateUrl: './track-stock-form.component.html',
  styleUrls: ['./track-stock-form.component.scss']
})
export class TrackStockFormComponent implements OnInit {

  stock: Stock = new Stock();

  constructor(private stockService: StockService) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    const stock: Stock = form.value;
    this.stockService.addStock(stock);
    form.resetForm();
  }

}
