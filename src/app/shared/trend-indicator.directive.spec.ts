import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrendIndicatorDirective } from './trend-indicator.directive';

@Component({
  template: `
    <span appTrendIndicator [change]="0"></span>
    <span appTrendIndicator [change]="1"></span>
    <span appTrendIndicator [change]="-1"></span>
  `
})
class TestComponent {  }

describe('TrendIndicatorDirective', () => {

  let fixture: ComponentFixture<TestComponent>;
  let debugElements: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TrendIndicatorDirective, TestComponent ]
    })
    .createComponent(TestComponent)

    fixture.detectChanges();

    debugElements = fixture.debugElement.queryAll(By.directive(TrendIndicatorDirective));
  })

  it('should have three directives', () => {
    expect(debugElements.length).toBe(3);
  })

  it('should show a black minus in 40px', () => {
    const fontSize = debugElements[0].nativeElement.style.fontSize;
    const innerHTML = debugElements[0].nativeElement.innerHTML;
    const color = debugElements[0].nativeElement.style.color;

    expect(fontSize).toBe('40px');
    expect(innerHTML).toBe('−');
    expect(color).toBe('black');
  });

  it('should show a green arrow up in 40px', () => {
    const fontSize = debugElements[1].nativeElement.style.fontSize;
    const innerHTML = debugElements[1].nativeElement.innerHTML;
    const color = debugElements[1].nativeElement.style.color;

    expect(fontSize).toBe('40px');
    expect(innerHTML).toBe('⬆');
    expect(color).toBe('green');
  });

  it('should show a red arrow down in 40px', () => {
    const fontSize = debugElements[2].nativeElement.style.fontSize;
    const innerHTML = debugElements[2].nativeElement.innerHTML;
    const color = debugElements[2].nativeElement.style.color;

    expect(fontSize).toBe('40px');
    expect(innerHTML).toBe('⬇');
    expect(color).toBe('red');
  });
});
