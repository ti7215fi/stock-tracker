import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

type HTMLCode = string;
type CSSColor = 'red' | 'black' | 'green';
type Indicator = {
  icon: HTMLCode
  color: CSSColor
}
const icons = {
  arrowUp: '&#11014;',
  arrowDown: '&#11015;',
  minus: '&#8722;'
}

@Directive({
  selector: '[appTrendIndicator]'
})
export class TrendIndicatorDirective implements OnInit {

  @Input() number: number = 0;

  private set indicator(indicator: Indicator) {
    this.setIcon(indicator.icon);
    this.setColor(indicator.color);
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { 
  }

  ngOnInit(): void {

    this.setFontSize();
  
    if (this.number > 0) {
      this.indicator = { 
        icon: icons.arrowUp,
        color: 'green'
      }
    } else if (this.number < 0) {
      this.indicator = { 
        icon: icons.arrowDown,
        color: 'red'
      }
    } else {
      this.indicator = { 
        icon: icons.minus,
        color: 'black'
      }
    }
  }

  private setFontSize(pixel: number = 40) {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', `${pixel}px`);
  }

  private setIcon(arrow: HTMLCode) {
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', arrow);
  }

  private setColor(color: CSSColor) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }

}
