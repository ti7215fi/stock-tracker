import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Sentiment } from 'src/app/core/stock.model';
import { TrendIndicatorDirective } from 'src/app/shared/trend-indicator.directive';
import { PlusPrefixPipe } from '../plus-prefix.pipe';

import { SentimentCardComponent } from './sentiment-card.component';

describe('SentimentCardComponent', () => {
  let component: SentimentCardComponent;
  let fixture: ComponentFixture<SentimentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        SentimentCardComponent, 
        TrendIndicatorDirective,
        PlusPrefixPipe
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays fallback values if no data is given', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const paragraphs = compiled.querySelectorAll('p');
      expect(paragraphs.length).toBe(3);

      const month = paragraphs[0];
      const change = paragraphs[1];
      const mspr = paragraphs[2];

      expect(month.innerHTML).toBe('UNKNOWN');
      expect(change.innerHTML).toBe('Change: 0');
      expect(mspr.innerHTML).toBe('MSPR: 0.00');
    });
  }))

  it('displays sentiment data', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const paragraphs = compiled.querySelectorAll('p');
      expect(paragraphs.length).toBe(3);

      const month = paragraphs[0];
      const change = paragraphs[1];
      const mspr = paragraphs[2];

      component.sentiment = new Sentiment(3, 5540, 12.209097);
      fixture.detectChanges();

      expect(month.innerHTML).toBe('MARCH');
      expect(change.innerHTML).toBe('Change: +5540');
      expect(mspr.innerHTML).toBe('MSPR: 12.21');

      component.sentiment = new Sentiment(1, -1250, -5.6179776);
      fixture.detectChanges();

      expect(month.innerHTML).toBe('JANUARY');
      expect(change.innerHTML).toBe('Change: -1250');
      expect(mspr.innerHTML).toBe('MSPR: -5.62');
    });

  }));
});
