import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchedulePageComponent } from './create-schedule-page.component';

describe('CreateSchedulePageComponent', () => {
  let component: CreateSchedulePageComponent;
  let fixture: ComponentFixture<CreateSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSchedulePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
