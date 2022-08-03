import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Quote } from 'src/app/core/stock.model';
import { StockService } from 'src/app/core/stock.service';
import { MockCompanyNameComponent } from 'src/app/shared/company-name/company-name.component.mock';
import { TrendIndicatorDirective } from 'src/app/shared/trend-indicator.directive';

import { QuoteCardComponent } from './quote-card.component';

describe('QuoteCardComponent', () => {
  let component: QuoteCardComponent;
  let fixture: ComponentFixture<QuoteCardComponent>;
  let quote: Quote | null = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ QuoteCardComponent, MockCompanyNameComponent, TrendIndicatorDirective ],
      providers: [
        {
          provide: StockService,
          useValue: {
            getQuote(symbol: string): Observable<Quote | null> {
              return of(quote);
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders a header with company name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const companyName = compiled.querySelector('app-company-name');
    expect(companyName).toBeDefined();
    expect(companyName).not.toBeNull();
  });

  it('renders a button to remove a stock', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeDefined();
    expect(button).not.toBeNull();
    expect(button?.innerHTML).toBe('X')
  });

  it('renders a link to show more details', () => {
    component.symbol = 'APPL';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link).toBeDefined();
    expect(link).not.toBeNull();
    expect(link?.href).toContain('/sentiment/APPL');

    component.symbol = 'GOOGL';
    fixture.detectChanges();

    expect(link?.href).toContain('/sentiment/GOOGL');
  });

  it('renders fallback values if no data is given', waitForAsync(() => {
    fixture.whenStable().then(() => {
      quote = null;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const paragraphs = compiled.querySelectorAll('p');
      expect(paragraphs.length).toBe(4);

      const change = paragraphs[0];
      const openingPrice = paragraphs[1];
      const currentPrice = paragraphs[2];
      const highPrice = paragraphs[3];

      expect(change.innerHTML).toBe('Change today 0.0%');
      expect(openingPrice.innerHTML).toBe('Opening price $0.00');
      expect(currentPrice.innerHTML).toBe('Current price $0.00');
      expect(highPrice.innerHTML).toBe('High price $0.00');
    })
  }));

  it('renders quote data', waitForAsync(() => {
    fixture.whenStable().then(() => {
      quote = new Quote(0.123213, 840.20, 842.70, 849.90);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const paragraphs = compiled.querySelectorAll('p');
      expect(paragraphs.length).toBe(4);

      const change = paragraphs[0];
      const openingPrice = paragraphs[1];
      const currentPrice = paragraphs[2];
      const highPrice = paragraphs[3];

      expect(change.innerHTML).toBe('Change today 12.321%');
      expect(openingPrice.innerHTML).toBe('Opening price $840.20');
      expect(currentPrice.innerHTML).toBe('Current price $842.70');
      expect(highPrice.innerHTML).toBe('High price $849.90');
    })
  }));
});
