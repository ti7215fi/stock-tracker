import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.scss']
})
export class CompanyNameComponent implements OnInit {

  @Input() symbol = '';

  companyName$!: Observable<string>;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.companyName$ = this.stockService.getCompanyName(this.symbol);
  }

}
