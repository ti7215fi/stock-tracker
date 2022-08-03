import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sentiment } from '../core/stock.model';
import { StockService } from '../core/stock.service';

import { SentimentResolver } from './sentiment.resolver';

describe('SentimentResolver', () => {
  let resolver: SentimentResolver;
  let route: ActivatedRoute;
  let routerSnapshotMock: RouterStateSnapshot = {
    url: '',
    root: new ActivatedRouteSnapshot()
  };
  let sentiments: Sentiment[] = [];
  let symbol = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StockService,
          useValue: {
            getSentimentData(symbol: string): Observable<Sentiment[]> {
              return of(sentiments);
            }
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ symbol })
            }
          }
        },
        {
          provide: RouterStateSnapshot,
          useValue: routerSnapshotMock
        }
      ]
    });
    resolver = TestBed.inject(SentimentResolver);
    route = TestBed.inject(ActivatedRoute);
  });

  afterEach(() => {
    sentiments = [];
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('resolves data recieved from server', done => {
    sentiments = [
      new Sentiment(3, 2021, 5540, 12.209097),
      new Sentiment(1, 2022, -1250, -5.6179776),
      new Sentiment(2, 2022, -1250, -2.1459227),
      new Sentiment(3, 2022, 5870, 8.960191)
    ]
    resolver.resolve(route.snapshot, routerSnapshotMock).subscribe(result => {
      expect(result).toBe(sentiments);
      done();
    });
  })

  it('resolves an empty array', done => {
    resolver.resolve(route.snapshot, routerSnapshotMock).subscribe(result => {
      expect(result).toEqual([]);
      done();
    });
  });

});
