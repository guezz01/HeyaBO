import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCountChartComponent } from './comment-count-chart.component';

describe('CommentCountChartComponent', () => {
  let component: CommentCountChartComponent;
  let fixture: ComponentFixture<CommentCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentCountChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
