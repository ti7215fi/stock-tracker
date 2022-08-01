import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentOverviewComponent } from './sentiment-overview.component';

describe('SentimentOverviewComponent', () => {
  let component: SentimentOverviewComponent;
  let fixture: ComponentFixture<SentimentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
