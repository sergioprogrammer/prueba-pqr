import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostIssuePqrChartComponent } from './most-issue-pqr-chart.component';

describe('MostIssuePqrChartComponent', () => {
  let component: MostIssuePqrChartComponent;
  let fixture: ComponentFixture<MostIssuePqrChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostIssuePqrChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostIssuePqrChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
