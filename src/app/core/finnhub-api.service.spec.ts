import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FinnhubApiService } from './finnhub-api.service';
import { Logger } from './logger.service';
import { loggerStub } from './logger.service.mock';
import { QuoteResponse, SearchResponse, SentimentResponse } from './finnhub-api.model';
import { Month, Quote, Sentiment } from './stock.model';

describe('FinnhubApiService', () => {
  let service: FinnhubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Logger, useValue: loggerStub }
      ]
    });
    service = TestBed.inject(FinnhubApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchQuote', () => {

    it('returns quote for a stock ', () => {
      const response: QuoteResponse = {
        c: 261.74,
        d: 3.21,
        dp: 0.3572,
        h: 263.31,
        l: 260.68,
        o: 261.07,
        pc: 259.45
      }
      let body: Quote | null | undefined;
      let succeeded = false;

      service.fetchQuote('APPL').subscribe((quote) => {
        body = quote;
        succeeded = true;
      })

      const uri = 'https://finnhub.io/api/v1/quote?symbol=APPL&token=bu4f8kn48v6uehqi3cqg'
      const request = httpMock.expectOne(uri);
      request.flush(response);

      expect(succeeded).toBeTruthy();
      expect(body).toEqual(new Quote(0.3572, 261.07, 261.74, 263.31))
    });
  });

  describe('fetchCompanyName', () => {

    it('returns the company name of the first item (items === 1)', () => {
      const response: SearchResponse = {
        count: 1,
        result: [
          {
            description: 'APPLE INC',
            displaySymbol: 'AAPL',
            symbol: 'AAPL',
            type: 'Common Stock'
          }
        ]
      }
      let body: string | null | undefined;
      let succeeded = false;

      service.fetchCompanyName('AAPL').subscribe((name) => {
        body = name;
        succeeded = true;
      })

      const uri = 'https://finnhub.io/api/v1/search?q=AAPL&token=bu4f8kn48v6uehqi3cqg'
      const request = httpMock.expectOne(uri);
      request.flush(response);

      expect(succeeded).toBeTruthy();
      expect(body).toBe('APPLE INC');
    });

    it('returns the company name of the first item (items > 1)', () => {
      const response: SearchResponse = {
        count: 2,
        result: [
          {
            description: 'APPLE INC',
            displaySymbol: 'AAPL',
            symbol: 'AAPL',
            type: 'Common Stock'
          },
          {
            description: 'APPLE INC 2',
            displaySymbol: 'AAPL.SW',
            symbol: 'AAPL.SW',
            type: 'Common Stock'
          }
        ]
      }
      let body: string | null | undefined;
      let succeeded = false;

      service.fetchCompanyName('AAPL').subscribe((name) => {
        body = name;
        succeeded = true;
      })

      const uri = 'https://finnhub.io/api/v1/search?q=AAPL&token=bu4f8kn48v6uehqi3cqg'
      const request = httpMock.expectOne(uri);
      request.flush(response);

      expect(succeeded).toBeTruthy();
      expect(body).toBe('APPLE INC');
    });

    it('returns the company name of item with the same symbol', () => {
      const response: SearchResponse = {
        count: 3,
        result: [
          {
            description: 'APPLE INC 2',
            displaySymbol: 'AAPL.SW',
            symbol: 'AAPL.SW',
            type: 'Common Stock'
          },
          {
            description: 'APPLE INC 3',
            displaySymbol: 'APC.BE',
            symbol: 'APC.BE',
            type: 'Common Stock'
          },
          {
            description: 'APPLE INC',
            displaySymbol: 'AAPL',
            symbol: 'AAPL',
            type: 'Common Stock'
          },
        ]
      }
      let body: string | null | undefined;
      let succeeded = false;

      service.fetchCompanyName('AAPL').subscribe((name) => {
        body = name;
        succeeded = true;
      })

      const uri = 'https://finnhub.io/api/v1/search?q=AAPL&token=bu4f8kn48v6uehqi3cqg'
      const request = httpMock.expectOne(uri);
      request.flush(response);

      expect(succeeded).toBeTruthy();
      expect(body).toBe('APPLE INC');
    });

    it('returns null if no results are available', () => {
      const response: SearchResponse = {
        count: 0,
        result: []
      }
      let body: string | null | undefined;
      let succeeded = false;

      service.fetchCompanyName('LORM').subscribe((name) => {
        body = name;
        succeeded = true;
      })

      const uri = 'https://finnhub.io/api/v1/search?q=LORM&token=bu4f8kn48v6uehqi3cqg'
      const request = httpMock.expectOne(uri);
      request.flush(response);

      expect(succeeded).toBeTruthy();
      expect(body).toBeNull();
    });
  });

  describe('fetchSentimentData', () => {


    it('returns sentiment data', () => {
      const response: SentimentResponse = {
        data: [
          {
            symbol: 'TSLA',
            year: 2021,
            month: 3,
            change: 5540,
            mspr: 12.209097
          },
          {
            symbol: 'TSLA',
            year: 2022,
            month: 1,
            change: -1250,
            mspr: -5.6179776
          },
          {
            symbol: 'TSLA',
            year: 2022,
            month: 2,
            change: -1250,
            mspr: -2.1459227
          },
          {
            symbol: 'TSLA',
            year: 2022,
            month: 3,
            change: 5870,
            mspr: 8.960191
          }
        ],
        symbol: 'TSLA'
      }
      let body: Sentiment[] | undefined;
      let succeeded = false;

      const currentMonth: Month = 8
      const now = new Date(2022, currentMonth - 1, 2);
      service.fetchSentimentData('TSLA', now).subscribe((data) => {
        body = data;
        succeeded = true;
      });

      const uri = 'https://finnhub.io/api/v1/stock/insider-sentiment?symbol=TSLA&from=2022-05-01&to=2022-07-31&token=bu4f8kn48v6uehqi3cqg'
      const request = httpMock.expectOne(uri);
      request.flush(response);

      const expectedBody = [
        new Sentiment(3, 2021, 5540, 12.209097),
        new Sentiment(1, 2022, -1250, -5.6179776),
        new Sentiment(2, 2022, -1250, -2.1459227),
        new Sentiment(3, 2022, 5870, 8.960191)
      ]

      expect(succeeded).toBeTruthy();
      expect(body).toEqual(expectedBody);
    });

    it('returns an empty array when any error occured', () => {
      let body: Sentiment[] | undefined

      const currentMonth: Month = 1
      const now = new Date(2022, currentMonth - 1, 2);
      service.fetchSentimentData('ERROR', now).subscribe((data) => {
        body = data;
      });

      const uri = 'https://finnhub.io/api/v1/stock/insider-sentiment?symbol=ERROR&from=2021-10-01&to=2021-12-31&token=bu4f8kn48v6uehqi3cqg'
      const request = httpMock.expectOne(uri);
      request.error(new ProgressEvent('NetworkFailure'));

      expect(body).toEqual([]);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
