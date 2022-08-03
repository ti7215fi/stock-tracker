import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Stock } from 'src/app/core/stock.model';
import { StockService } from 'src/app/core/stock.service';

import { TrackStockFormComponent } from './track-stock-form.component';

describe('TrackStockFormComponent', () => {
  let component: TrackStockFormComponent;
  let fixture: ComponentFixture<TrackStockFormComponent>;
  let stocks: Stock[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TrackStockFormComponent ],
      providers: [
        {
          provide: StockService,
          useValue: {
            addStock(symbol: string) {
              stocks.push(new Stock(symbol));
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a form with label, input and button', waitForAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('form');
      expect(form).toBeDefined();
      expect(form?.hasChildNodes()).toBeTruthy();

      const label = form?.querySelector('label');
      expect(label).toBeDefined();
      expect(label?.getAttribute('for')).toBe('symbol');

      const input = form?.querySelector('input');
      expect(input).toBeDefined();
      expect(input?.getAttribute('id')).toBe('symbol');
      expect(input?.getAttribute('name')).toBe('symbol');
      expect(input?.getAttribute('type')).toBe('text');
      expect(input?.getAttribute('minlength')).toBe('1');
      expect(input?.getAttribute('maxlength')).toBe('5');
      expect(input?.getAttribute('required')).toBeDefined();

      const button = form?.querySelector('button');
      expect(button).toBeDefined();
      expect(button?.getAttribute('type')).toBe('submit');
    });
  }));
});
