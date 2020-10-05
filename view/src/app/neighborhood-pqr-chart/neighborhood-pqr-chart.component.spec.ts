import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodPqrChartComponent } from './neighborhood-pqr-chart.component';

describe('NeighborhoodPqrChartComponent', () => {
  let component: NeighborhoodPqrChartComponent;
  let fixture: ComponentFixture<NeighborhoodPqrChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeighborhoodPqrChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighborhoodPqrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
