import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPqrChartComponent } from './monthly-pqr-chart.component';

describe('MonthlyPqrChartComponent', () => {
  let component: MonthlyPqrChartComponent;
  let fixture: ComponentFixture<MonthlyPqrChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyPqrChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPqrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
