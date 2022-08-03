import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Stock } from 'src/app/core/stock.model';
import { StockService } from 'src/app/core/stock.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let stocks: Stock[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, MockTrackStockFormComponent, MockQuoteCardComponent ],
      providers: [
        { 
          provide: StockService, useValue: {
            get stocks(): Stock[] {
              return stocks;
            }
         } 
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a form to track a stock', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('app-track-stock-form');
      expect(form).toBeDefined();
    });
  }));

  it('renders three card components to show quote data', waitForAsync(() => {
    stocks = [
      new Stock('AAPL', 'Apple Inc.'),
      new Stock('TSLA', 'Tesla Inc.'),
      new Stock('GOOGL', 'Alphabet Inc.')
    ]

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('app-quote-card');
      expect(cards.length).toBe(3);
    });
  }));

});

@Component({
  selector: 'app-track-stock-form',
  template: ''
})
class MockTrackStockFormComponent {
}

@Component({
  selector: 'app-quote-card',
  template: ''
})
class MockQuoteCardComponent {
  @Input() symbol: string = '';
}