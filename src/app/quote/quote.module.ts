import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StockComponent } from './stock/stock.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StockComponent,
    StockFormComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuoteRoutingModule,
    SharedModule
  ]
})
export class QuoteModule { }
