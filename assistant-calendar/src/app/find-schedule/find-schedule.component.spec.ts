import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindScheduleComponent } from './find-schedule.component';

describe('FindScheduleComponent', () => {
  let component: FindScheduleComponent;
  let fixture: ComponentFixture<FindScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
