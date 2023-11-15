import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubmitScheduleComponent } from './submit-schedule.component';
import { Schedule } from 'src/app/Models/schedule.model';
import { of } from 'rxjs';

describe('SubmitScheduleComponent', () => {
  let component: SubmitScheduleComponent;
  let fixture: ComponentFixture<SubmitScheduleComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubmitScheduleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitScheduleComponent);
    component = fixture.componentInstance;
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
    const mockSchedule = new Schedule({
      _id: 'some-id', // Assuming _id is used as id
      owner: 'owner-id',
      name: 'Test Schedule',
      description: 'Test Description',
      password: 'TestPassword',
      subscribedUsers: [], // Assuming this should be an empty array initially
      events: [] // Assuming this should be an empty array initially
    });

    component.createSchedule(mockSchedule);
    const req = httpTestingController.expectOne('/schedule/create');
    expect(req.request.method).toBe('POST');
    req.flush({}); // Mock the response
  });

  it('should generate a unique ID', async () => {
    spyOn(component['http'], 'get').and.returnValue(of(false));
    const id = await component.generateUniqueId();
    expect(id).toBeTruthy();
    expect(id.length).toBe(6);
  });


});
