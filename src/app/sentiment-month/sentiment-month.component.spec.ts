import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentMonthComponent } from './sentiment-month.component';

describe('SentimentMonthComponent', () => {
  let component: SentimentMonthComponent;
  let fixture: ComponentFixture<SentimentMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
