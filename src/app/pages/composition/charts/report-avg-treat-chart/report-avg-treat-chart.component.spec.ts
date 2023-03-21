import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAvgTreatChartComponent } from './report-avg-treat-chart.component';

describe('ReportAvgTreatChartComponent', () => {
  let component: ReportAvgTreatChartComponent;
  let fixture: ComponentFixture<ReportAvgTreatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAvgTreatChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAvgTreatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
