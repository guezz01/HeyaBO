import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientChartComponent } from './new-client-chart.component';

describe('NewClientChartComponent', () => {
  let component: NewClientChartComponent;
  let fixture: ComponentFixture<NewClientChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClientChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClientChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
