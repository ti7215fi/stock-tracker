import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlusPrefixPipe } from './plus-prefix.pipe';
import { SentimentMonthComponent } from './sentiment-month/sentiment-month.component';
import { InsiderSentimentRoutingModule } from './insider-sentiment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SentimentComponent } from './sentiment/sentiment.component';



@NgModule({
  declarations: [
    PlusPrefixPipe,
    SentimentComponent,
    SentimentMonthComponent,
  ],
  imports: [
    CommonModule,
    InsiderSentimentRoutingModule,
    SharedModule
  ]
})
export class InsiderSentimentModule { }
