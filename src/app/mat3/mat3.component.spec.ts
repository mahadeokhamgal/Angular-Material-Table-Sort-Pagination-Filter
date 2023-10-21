import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mat3Component } from './mat3.component';

describe('Mat3Component', () => {
  let component: Mat3Component;
  let fixture: ComponentFixture<Mat3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mat3Component]
    });
    fixture = TestBed.createComponent(Mat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
