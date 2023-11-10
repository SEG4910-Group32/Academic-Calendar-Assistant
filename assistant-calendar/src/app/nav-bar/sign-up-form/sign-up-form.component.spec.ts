import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpFormComponent } from './sign-up-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/email.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFacade } from 'src/app/Facades/user.facade';
import { UserFactory } from 'src/app/Factories/user.factory';
import { of } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Corrected Import
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let userFacade: UserFacade;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: EmailService, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: UserFacade, useValue: { createUser: () => of(new User({})) } },
        { provide: UserFactory, useValue: { createUser: () => new User({}) } },
        MatSnackBar
      ],
      imports: [
        HttpClientTestingModule, 
        BrowserAnimationsModule, 
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule, // Corrected Import
        MatSnackBarModule,
        MatDialogModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    userFacade = TestBed.inject(UserFacade);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required controls', () => {
    expect(component.signUpForm.contains('email')).toBeTruthy();
    expect(component.signUpForm.contains('firstName')).toBeTruthy();
    expect(component.signUpForm.contains('lastName')).toBeTruthy();
    expect(component.signUpForm.contains('password')).toBeTruthy();
  });

  it('should require email', () => {
    const control = component.signUpForm.get('email');
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalsy();
    } else {
      fail('Email control is null');
    }
  });

  it('should submit form if valid', () => {
    let control = component.signUpForm;
    control.setValue({
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      type: 'Student',
      username: 'tester',
      password: 'Password123'
    });
    spyOn(userFacade, 'createUser').and.returnValue(of(new User({})));
    component.submit();
    expect(userFacade.createUser).toHaveBeenCalled();
  });

  it('should not submit form if invalid', () => {
    let control = component.signUpForm;
    control.setValue({
      email: 'invalidEmail',
      firstName: 'John',
      lastName: 'Doe',
      type: 'Student',
      username: 'tester',
      password: 'short'
    });
    component.submit();
    expect(userFacade.createUser).not.toHaveBeenCalled();
  });

  it('should handle error on user creation', () => {
    const errorResponse = new Error('User exists');
    spyOn(userFacade, 'createUser').and.returnValue(of(errorResponse as any)); // Casting Error as User type
    spyOn(snackBar, 'open');
    component.createUser({});
    expect(snackBar.open).toHaveBeenCalled();
  });
});
