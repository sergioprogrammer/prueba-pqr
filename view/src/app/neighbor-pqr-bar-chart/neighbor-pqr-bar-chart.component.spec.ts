import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborPqrBarChartComponent } from './neighbor-pqr-bar-chart.component';

describe('NeighborPqrBarChartComponent', () => {
  let component: NeighborPqrBarChartComponent;
  let fixture: ComponentFixture<NeighborPqrBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeighborPqrBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeighborPqrBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
