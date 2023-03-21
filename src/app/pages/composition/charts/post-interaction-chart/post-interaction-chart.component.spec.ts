import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInteractionChartComponent } from './post-interaction-chart.component';

describe('PostInteractionChartComponent', () => {
  let component: PostInteractionChartComponent;
  let fixture: ComponentFixture<PostInteractionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostInteractionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostInteractionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
