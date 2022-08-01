import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendIndicatorDirective } from './trend-indicator.directive';
import { CompanyNameComponent } from './company-name/company-name.component';



@NgModule({
  declarations: [
    TrendIndicatorDirective,
    CompanyNameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrendIndicatorDirective,
    CompanyNameComponent
  ]
})
export class SharedModule { }
