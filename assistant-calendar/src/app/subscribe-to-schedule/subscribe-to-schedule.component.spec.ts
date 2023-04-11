import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeToScheduleComponent } from './subscribe-to-schedule.component';

describe('SubscribeToScheduleComponent', () => {
  let component: SubscribeToScheduleComponent;
  let fixture: ComponentFixture<SubscribeToScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeToScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeToScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
