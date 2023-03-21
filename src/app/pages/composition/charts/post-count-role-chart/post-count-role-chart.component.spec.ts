import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCountRoleChartComponent } from './post-count-role-chart.component';

describe('PostCountRoleChartComponent', () => {
  let component: PostCountRoleChartComponent;
  let fixture: ComponentFixture<PostCountRoleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCountRoleChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCountRoleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
