import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedulePageComponent } from './edit-schedule-page.component';

describe('EditSchedulePageComponent', () => {
  let component: EditSchedulePageComponent;
  let fixture: ComponentFixture<EditSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchedulePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
