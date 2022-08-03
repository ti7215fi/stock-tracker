import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Sentiment } from 'src/app/core/stock.model';
import { MockCompanyNameComponent } from 'src/app/shared/company-name/company-name.component.mock';

import { SentimentOverviewComponent } from './sentiment-overview.component';

describe('SentimentOverviewComponent', () => {
  let component: SentimentOverviewComponent;
  let fixture: ComponentFixture<SentimentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SentimentOverviewComponent, MockCompanyNameComponent, MockSentimentCardComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({symbol: 'APPL'}),
            data: of({ sentimentData: [      
              new Sentiment(1, -1250, -5.6179776),
              new Sentiment(2, -1250, -2.1459227)
            ]})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders a company name', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('app-company-name')).toBeDefined();
    })
  }));

  it('renders sentiment cards', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const cards = compiled.querySelectorAll('app-sentiment-card');
      expect(cards.length).toBe(2);
    });
  }));

  it('renders a link back to dashboard', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const link = compiled.querySelector('a');
      const href = link?.getAttribute('href')
  
      expect(link).toBeDefined();
      expect(href).toEqual('/dashboard');
    });
  }));

});

@Component({
  selector: 'app-sentiment-card',
  template: ''
})
export class MockSentimentCardComponent {
  @Input() sentiment: Sentiment = new Sentiment();
}