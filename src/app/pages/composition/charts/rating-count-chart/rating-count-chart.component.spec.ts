import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCountChartComponent } from './rating-count-chart.component';

describe('RatingCountChartComponent', () => {
  let component: RatingCountChartComponent;
  let fixture: ComponentFixture<RatingCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingCountChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
