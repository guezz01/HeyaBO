import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentUserActivityChartComponent } from './comment-user-activity-chart.component';

describe('CommentUserActivityChartComponent', () => {
  let component: CommentUserActivityChartComponent;
  let fixture: ComponentFixture<CommentUserActivityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentUserActivityChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentUserActivityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
