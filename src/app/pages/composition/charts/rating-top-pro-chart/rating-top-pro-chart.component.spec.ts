import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingTopProChartComponent } from './rating-top-pro-chart.component';

describe('RatingTopProChartComponent', () => {
  let component: RatingTopProChartComponent;
  let fixture: ComponentFixture<RatingTopProChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingTopProChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingTopProChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
