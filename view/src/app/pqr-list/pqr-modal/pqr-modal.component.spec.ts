import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrModalComponent } from './pqr-modal.component';

describe('PqrModalComponent', () => {
  let component: PqrModalComponent;
  let fixture: ComponentFixture<PqrModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PqrModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PqrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
