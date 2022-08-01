import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowDirective } from './arrow.directive';
import { CompanyNameComponent } from './company-name/company-name.component';



@NgModule({
  declarations: [
    ArrowDirective,
    CompanyNameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArrowDirective,
    CompanyNameComponent
  ]
})
export class SharedModule { }
