import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { SharedModule } from '../shared/shared.module';
import { QuoteCardComponent } from './quote-card/quote-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackStockFormComponent } from './track-stock-form/track-stock-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuoteCardComponent,
    TrackStockFormComponent,
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
