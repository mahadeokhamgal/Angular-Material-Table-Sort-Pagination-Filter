import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDialogComponentComponent } from './example-dialog-component.component';

describe('ExampleDialogComponentComponent', () => {
  let component: ExampleDialogComponentComponent;
  let fixture: ComponentFixture<ExampleDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ExampleDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
