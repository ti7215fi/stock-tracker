import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStockFormComponent } from './track-stock-form.component';

describe('TrackStockFormComponent', () => {
  let component: TrackStockFormComponent;
  let fixture: ComponentFixture<TrackStockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackStockFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
