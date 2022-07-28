import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from '../stock';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {

  stock: Stock = new Stock();

  constructor(private stockService: StockService) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    const stock: Stock = form.value;
    this.stockService.addStock(stock);
    form.resetForm();
  }

}
