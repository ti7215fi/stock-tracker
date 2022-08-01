import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appArrow]'
})
export class ArrowDirective implements OnInit {

  @Input() number: number = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { 
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '40px');
    if (this.number > 0) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '&#11014;');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
    } else if (this.number < 0) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '&#11015;');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    }
  }

}
