import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportScheduleComponent } from './import-schedule.component';

describe('ImportScheduleComponent', () => {
  let component: ImportScheduleComponent;
  let fixture: ComponentFixture<ImportScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
