import { MonthNamePipe } from './month-name.pipe';

describe('MonthNamePipe', () => {
  const pipe = new MonthNamePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('shows the correct month name', () => {
    expect(pipe.transform(1)).toBe('JANUARY');
    expect(pipe.transform(2)).toBe('FEBRUARY');
    expect(pipe.transform(3)).toBe('MARCH');
    expect(pipe.transform(4)).toBe('APRIL');
    expect(pipe.transform(5)).toBe('MAY');
    expect(pipe.transform(6)).toBe('JUNE');
    expect(pipe.transform(7)).toBe('JULY');
    expect(pipe.transform(8)).toBe('AUGUST');
    expect(pipe.transform(9)).toBe('SEPTEMBER');
    expect(pipe.transform(10)).toBe('OCTOBER');
    expect(pipe.transform(11)).toBe('NOVEMBER');
    expect(pipe.transform(12)).toBe('DECEMBER');
  });

  it('shows UNKNOWN', () => {
    expect(pipe.transform(undefined)).toBe('UNKNOWN');
  });

});
