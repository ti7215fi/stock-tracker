import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusPrefixPipe } from './plus-prefix.pipe';
import { SentimentCardComponent } from './sentiment-card/sentiment-card.component';
import { InsiderSentimentRoutingModule } from './sentiment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SentimentOverviewComponent } from './sentiment-overview/sentiment-overview.component';
import { MonthNamePipe } from './month-name.pipe';



@NgModule({
  declarations: [
    PlusPrefixPipe,
    SentimentOverviewComponent,
    SentimentCardComponent,
    MonthNamePipe,
  ],
  imports: [
    CommonModule,
    InsiderSentimentRoutingModule,
    SharedModule
  ]
})
export class SentimentModule { }
