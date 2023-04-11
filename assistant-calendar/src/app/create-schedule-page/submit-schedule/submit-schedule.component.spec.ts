import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitScheduleComponent } from './submit-schedule.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SendScheduleService } from '../send-schedule.service';
import { of } from 'rxjs';



describe('SubmitScheduleComponent', () => {
  let component: SubmitScheduleComponent;
  let fixture: ComponentFixture<SubmitScheduleComponent>;
  let sendScheduleSvc: SendScheduleService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [ SubmitScheduleComponent ],
      providers: [SendScheduleService],
    })
    .compileComponents();

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

  it('should create a schedule', async () => {
    // Assign mock schedule data directly to the sc property
    sendScheduleSvc.sc = [
      // mock schedule data
    ];
  
    component.createSchedule();
    const req = httpTestingController.expectOne('/schedule/create');
    expect(req.request.method).toBe('POST');
    req.flush({});
  
    // Add any other expectations, such as whether the schedule data is as expected
  });
  

  it('should generate a unique ID', async () => {
    spyOn(component['http'], 'get').and.returnValue(of(false));

    const id = await component.generateUniqueId();
    expect(id).toBeTruthy();
    expect(id.length).toBeGreaterThanOrEqual(9);

    // Add any other expectations, such as whether the ID is unique
  });
});
