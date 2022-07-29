import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockComponent } from './stock/stock.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { SentimentMonthComponent } from './sentiment-month/sentiment-month.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlusPrefixPipe } from './plus-prefix.pipe';
import { CompanyNameComponent } from './company-name/company-name.component';
import { ArrowDirective } from './arrow.directive';

@NgModule({
  declarations: [
    AppComponent,
    StockFormComponent,
    StockComponent,
    SentimentComponent,
    SentimentMonthComponent,
    DashboardComponent,
    PlusPrefixPipe,
    CompanyNameComponent,
    ArrowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
