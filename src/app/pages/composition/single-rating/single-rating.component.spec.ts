import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRatingComponent } from './single-rating.component';

describe('SingleRatingComponent', () => {
  let component: SingleRatingComponent;
  let fixture: ComponentFixture<SingleRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
