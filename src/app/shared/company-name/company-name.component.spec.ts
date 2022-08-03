import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StockService } from 'src/app/core/stock.service';

import { CompanyNameComponent } from './company-name.component';

describe('CompanyNameComponent', () => {
  let component: CompanyNameComponent;
  let fixture: ComponentFixture<CompanyNameComponent>;
  let companyName: string | null = null;
  let delayValue: number = 0

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyNameComponent ],
      providers: [
        {
          provide: StockService,
          useValue: {
            getCompanyName(symbol: string): Observable<string | null> {
              return of(companyName).pipe(delay(delayValue));
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyNameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show a loading indicator', () => {
    delayValue = 500;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('⏳ Loading ...');
  });

  it('shows Unknown as fallback', waitForAsync(() => {
    companyName = null;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Unknown');
    })
  }));

  it('shows a company name', waitForAsync(() => {
    companyName = 'Apple Inc';
    component.showSymbol = false;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Apple Inc');
    })
  }));

  it('shows a company name with the stock symbol', waitForAsync(() => {
    companyName = 'Apple Inc';
    component.symbol = 'APPL';
    component.showSymbol = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Apple Inc (APPL)');
    })
  }));
});
