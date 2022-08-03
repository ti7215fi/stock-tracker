import { PlusPrefixPipe } from './plus-prefix.pipe';

describe('PlusPrefixPipe', () => {

  const pipe = new PlusPrefixPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('adds a + prefix to numbers greater than 0', () => {
    expect(pipe.transform(42)).toBe('+42');
  });

  it('doesn\'t add a + prefix to numbers less than 0', () => {
    expect(pipe.transform(-42)).toBe('-42');
  });

  it('doesn\'t add a + prefix to numbers which equals 0', () => {
    expect(pipe.transform(0)).toBe('0');
  });

});
