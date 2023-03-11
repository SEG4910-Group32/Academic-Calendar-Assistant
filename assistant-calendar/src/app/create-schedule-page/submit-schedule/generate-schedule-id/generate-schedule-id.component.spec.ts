import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateScheduleIdComponent } from './generate-schedule-id.component';

describe('GenerateScheduleIdComponent', () => {
  let component: GenerateScheduleIdComponent;
  let fixture: ComponentFixture<GenerateScheduleIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateScheduleIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateScheduleIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
