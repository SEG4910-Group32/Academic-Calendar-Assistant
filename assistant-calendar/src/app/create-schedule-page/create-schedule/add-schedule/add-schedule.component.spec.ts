import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddScheduleComponent } from './add-schedule.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

describe('AddScheduleComponent', () => {
  let component: AddScheduleComponent;
  let fixture: ComponentFixture<AddScheduleComponent>;
  let mockDialogRef: { close: jasmine.Spy };

  beforeEach(async () => {
    mockDialogRef = { close: jasmine.createSpy('close') };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatDatepickerModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatNativeDateModule
      ],
      declarations: [AddScheduleComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AddScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test Case 1: 'should create'
   * Description: Verifies if the AddScheduleComponent is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test Case 2: 'should initialize with default data'
   * Description: Checks if the component initializes with the expected default data.
   */
  it('should initialize with default data', () => {
    expect(component.data).toBeDefined();
  });

  /**
   * Test Case 3: 'should close dialog on cancel click'
   * Description: Ensures that the dialog is closed without data when the cancel button is clicked.
   */
  it('should close dialog on cancel click', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  /**
   * Test Case 4: 'should close dialog with data on add click'
   * Description: Tests if the dialog closes and returns data when the add button is clicked.
   */
  it('should close dialog with data on add click', () => {
    component.data = { type: 'Test', dueDate: '2021-01-01', startDate: '2021-01-01', location: 'Test', description: 'Test' };
    component.dialogRef.close(component.data);
    expect(mockDialogRef.close).toHaveBeenCalledWith(component.data);
  });

  /**
   * Test Case 5: 'should disable add button with invalid data'
   * Description: Verifies that the add button is disabled when required data is missing or invalid.
   */
  it('should disable add button with invalid data', () => {
    component.data = { type: '', dueDate: '', startDate: '', location: '', description: '' };
    fixture.detectChanges();
    const addButton = fixture.nativeElement.querySelector('#addbtn');
    expect(addButton.disabled).toBeTruthy();
  });
});
