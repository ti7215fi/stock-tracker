import { TestBed } from '@angular/core/testing';
import { Stock } from './stock.model';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let store: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);

    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
  });

  afterEach(() => {
    store = {};
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveItem', () => {

    it('saves any object as string', () => {
      const stocks = [new Stock('APPL')];
      service.saveItem('stocks', stocks);
      expect(localStorage.setItem).toHaveBeenCalledWith('stocks', '[{"symbol":"APPL"}]')
    });

    it('overrides object with same key', () => {
      store = { stocks: '[{"symbol":"APPL"}]'}

      service.saveItem('stocks', 'GOOGL');

      expect(store.stocks).toBe('"GOOGL"');
      expect(localStorage.setItem).toHaveBeenCalledWith('stocks', '"GOOGL"');
    });

  });

  describe('getItem', () => {

    it('returns object from cache', () => {
      store = { stocks: '[{"symbol":"APPL"}]'}

      const stocks = service.getItem<Stock[]>('stocks');
      expect(stocks).not.toBeNull();
      expect(stocks![0]).toEqual({ symbol: 'APPL' })
      expect(localStorage.getItem).toHaveBeenCalledWith('stocks');
    });

    it('returns null if no object was found', () => {
      const stocks = service.getItem<Stock[]>('stocks');
      expect(stocks).toBeNull();
      expect(localStorage.getItem).toHaveBeenCalledWith('stocks');
    });
  });
});
