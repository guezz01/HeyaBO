import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDifferenceChartComponent } from './client-difference-chart.component';

describe('ClientDifferenceChartComponent', () => {
  let component: ClientDifferenceChartComponent;
  let fixture: ComponentFixture<ClientDifferenceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDifferenceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDifferenceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
