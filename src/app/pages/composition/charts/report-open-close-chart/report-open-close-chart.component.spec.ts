import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOpenCloseChartComponent } from './report-open-close-chart.component';

describe('ReportOpenCloseChartComponent', () => {
  let component: ReportOpenCloseChartComponent;
  let fixture: ComponentFixture<ReportOpenCloseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOpenCloseChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportOpenCloseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
