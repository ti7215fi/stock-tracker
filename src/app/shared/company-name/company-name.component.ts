import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, of, take, tap } from 'rxjs';
import { StockService } from 'src/app/core/stock.service';


@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.scss']
})
export class CompanyNameComponent implements OnInit {

  @Input() symbol = '';
  @Input() showSymbol = false;

  displayName$: Observable<string> = of('Unknown');

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.displayName$ = this.stockService.getCompanyName(this.symbol).pipe(
      map(name => {
        const companyName = name ?? 'Unknown';
        return this.showSymbol ? `${companyName} (${this.symbol})` : companyName
      })
    );
  }

}
