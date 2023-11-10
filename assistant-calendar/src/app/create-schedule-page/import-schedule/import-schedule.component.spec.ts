import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImportScheduleComponent } from './import-schedule.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ImportScheduleComponent', () => {
  let component: ImportScheduleComponent;
  let fixture: ComponentFixture<ImportScheduleComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportScheduleComponent ],
      imports: [ MatDialogModule, NoopAnimationsModule ],
      providers: [ MatDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog on openImportDialog call', () => {
    spyOn(dialog, 'open');
    component.openImportDialog();
    expect(dialog.open).toHaveBeenCalled();
  });
});
