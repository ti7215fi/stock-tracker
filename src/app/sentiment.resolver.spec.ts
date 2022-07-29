import { TestBed } from '@angular/core/testing';

import { SentimentResolver } from './sentiment.resolver';

describe('SentimentResolver', () => {
  let resolver: SentimentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SentimentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
