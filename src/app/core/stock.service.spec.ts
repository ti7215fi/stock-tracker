import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FinnhubApiService } from './finnhub-api.service';
import { Logger } from './logger.service';
import { loggerStub } from './logger.service.mock';
import { Quote, Stock } from './stock.model';

import { StockService } from './stock.service';
import { StorageService } from './storage.service';
import { StorageFakeService } from './storage.service.mock';

describe('StockService', () => {

  let finnhubApiSpy: jasmine.SpyObj<FinnhubApiService>;
  let fakeStorage: StorageFakeService;
  let exampleError = new Error('An unknown error occured!');

  let service: StockService;

  beforeEach(() => {
    const finnhubApiSpyObj = jasmine.createSpyObj('FinnhubApiService', ['fetchQuote', 'fetchCompanyName']);
    fakeStorage = new StorageFakeService()

    TestBed.configureTestingModule({
      providers: [
        Logger,
        { provide: Logger, useValue: loggerStub },
        { provide: StorageService, useValue: fakeStorage },
        { provide: FinnhubApiService, useValue: finnhubApiSpyObj },
      ]
    });
    service = TestBed.inject(StockService);
    finnhubApiSpy = TestBed.inject(FinnhubApiService) as jasmine.SpyObj<FinnhubApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addStock', () => {

    it('adds a stock', () => {
      const appleStock = new Stock('APPL');
      const teslaStock = new Stock('TSLA');

      service.addStock(appleStock);
      
      expect(fakeStorage.getItem<Stock[]>('stocks')).toBeDefined();
      expect(fakeStorage.getItem<Stock[]>('stocks')?.length).toBe(1);
      expect(fakeStorage.getItem<Stock[]>('stocks')).toContain(appleStock);
      expect(fakeStorage.getItem<Stock[]>('stocks')).not.toContain(teslaStock);
    })

    it('doesn\'t add a stock twice', () => {
      const appleStock = new Stock('APPL');

      service.addStock(appleStock);
      service.addStock(appleStock);
      
      expect(fakeStorage.getItem<Stock[]>('stocks')).toBeDefined();
      expect(fakeStorage.getItem<Stock[]>('stocks')?.length).toBe(1);
      expect(fakeStorage.getItem<Stock[]>('stocks')).toContain(appleStock);
    })
  });

  describe('updateStock', () => {

    it('updates a stock', () => {
      const teslaStock = new Stock('TSLA');
      service.addStock(teslaStock);

      const cachedStocks = fakeStorage.getItem<Stock[]>('stocks');
      expect(cachedStocks![0]).toEqual(teslaStock);
      expect(cachedStocks![0].companyName).toBeUndefined();

      teslaStock.companyName = 'Tesla Inc';
      service.updateStock(teslaStock);

      expect(cachedStocks![0].companyName).toBeDefined();
      expect(cachedStocks![0].companyName).toBe('Tesla Inc');
    });

    it('doesn\'t throw an error is stock doesn\'t exist', () => {
      const appleStock = new Stock('APPL');
      appleStock.companyName = 'Apple Inc';

      expect(() => {
        service.updateStock(appleStock);
      }).not.toThrow();
    });
  });

  describe('getStockBySymbol', () => {

    beforeEach(() => {
      const teslaStock = new Stock('TSLA');
      service.addStock(teslaStock);
    })

    it('returns a stock', () => {
      expect(service.getStockBySymbol('TSLA')).toBeDefined();
    });

    it('returns null if there is no stock with that symbol', () => {
      expect(service.getStockBySymbol('APPL')).toBeNull();
    })
  });

  describe('getCompanyName', () => {

    it('returns cached company name', done => {
      const teslaStock = new Stock('TSLA', 'Tesla Inc');
      service.addStock(teslaStock);
      service.getCompanyName('TSLA').subscribe(name => { 
        expect(name).toBe('Tesla Inc');
        done();
      });
    });

    it('returns null', done => {
      service.getCompanyName('TSLA').subscribe(name => { 
        expect(name).toBeNull();
        done();
      });
    })

    it('returns name received from api and saves data locally', done => {
      const appleStock = new Stock('APPL');
      service.addStock(appleStock);

      finnhubApiSpy.fetchCompanyName.and.returnValue(of('Apple Inc'));

      service.getCompanyName('APPL').subscribe(name => { 
        expect(name).toBe('Apple Inc');
        done();
      });
    })
    
    it('returns null in case of an api error', done => {
      const teslaStock = new Stock('TSLA', 'Tesla Inc');
      const appleStock = new Stock('APPL');
    
      service.addStock(teslaStock);
      service.addStock(appleStock);

      finnhubApiSpy.fetchCompanyName.and.returnValue(throwError(() => exampleError))

      service.getCompanyName('APPL').subscribe(name => { 
        expect(name).toBeNull();
        done();
      });
    })
  });

  describe('getQuote', () => {

    it('returns cached quote', done => {
      const expectedQuote = new Quote(22124, 840.20, 842.70, 849.90);
      const teslaStock = new Stock(
        'TSLA', 
        'Tesla Inc', 
        expectedQuote
      );
      service.addStock(teslaStock);

      service.getQuote('TSLA').subscribe(quote => {
        expect(quote).toBe(expectedQuote);
        done();
      });
    });

    it('returns an null', done => {  
      service.getQuote('TSLA').subscribe(quote => {
        expect(quote).toBeNull();
        done();
      });
    });

    it('returns quote received from api and saved data locally', done => {
      const expectedQuote = new Quote(3572, 156.98, 157.35, 157.64);
      const appleStock = new Stock('APPL', 'Apple Inc');
      service.addStock(appleStock);

      finnhubApiSpy.fetchQuote.and.returnValue(of(expectedQuote));

      service.getQuote('APPL').subscribe(quote => {
        expect(quote).toBe(expectedQuote);
        done();
      });
    });

    it('returns an null in case of an api error', done => {
      const appleStock = new Stock('APPL', 'Apple Inc');
      service.addStock(appleStock);

      finnhubApiSpy.fetchQuote.and.returnValue(throwError(() => exampleError))

      service.getQuote('APPL').subscribe(quote => {
        expect(quote).toBeNull();
        done();
      });
    });
  });

  describe('removeStock', () => {

    it('removes a stock', () => {
      const appleStock = new Stock(
        'APPL', 
        'Apple Inc', 
        new Quote(3572, 156.98, 157.35, 157.64)
      );
      service.addStock(appleStock);

      expect(service.getStockBySymbol('APPL')).toBeDefined();
      
      service.removeStock('APPL');
      expect(service.getStockBySymbol('APPL')).toBeNull();
    });


    it('doesn\'t throw an error is stock doesn\'t exist', () => {
      expect(() => {
        service.removeStock('APPL');
      }).not.toThrow();
    });
  });
});
