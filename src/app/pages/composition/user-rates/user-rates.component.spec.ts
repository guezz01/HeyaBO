import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatesComponent } from './user-rates.component';

describe('UserRatesComponent', () => {
  let component: UserRatesComponent;
  let fixture: ComponentFixture<UserRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
