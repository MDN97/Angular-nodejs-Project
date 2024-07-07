import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarsComponent } from './edit-reservations.component';

describe('EditCarsComponent', () => {
  let component: EditCarsComponent;
  let fixture: ComponentFixture<EditCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCarsComponent],
    });
    fixture = TestBed.createComponent(EditCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
