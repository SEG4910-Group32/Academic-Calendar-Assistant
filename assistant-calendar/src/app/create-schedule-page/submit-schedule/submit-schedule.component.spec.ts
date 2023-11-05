import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitScheduleComponent } from './submit-schedule.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SendScheduleService } from '../send-schedule.service';
import { of } from 'rxjs';
import { Schedule } from 'src/app/Models/schedule.model';



describe('SubmitScheduleComponent', () => {
  let component: SubmitScheduleComponent;
  let fixture: ComponentFixture<SubmitScheduleComponent>;
  let sendScheduleSvc: SendScheduleService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [SubmitScheduleComponent],
      providers: [SendScheduleService],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitScheduleComponent);
    component = fixture.componentInstance;
    sendScheduleSvc = TestBed.inject(SendScheduleService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a schedule', () => {
    // Assign mock schedule data directly to the sc property
    const mockSchedule = {
      Event: [], // Populate with any relevant mock data
      createdTime: new Date().toISOString(),
      scheduleName: 'Test Schedule'
    };
    component.createSchedule(mockSchedule);
    const req = httpTestingController.expectOne('http://localhost:3000/schedule/create');
    sendScheduleSvc.sc = [
      // mock schedule data
    ];
  
    component.createSchedule(new Schedule({}));
    const req = httpTestingController.expectOne('/schedule/create');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should generate a unique ID', async () => {
    spyOn(component['http'], 'get').and.returnValue(of(false));
    const id = await component.generateUniqueId();
    expect(id).toBeTruthy();
    expect(id.length).toBe(6);
  });
});
