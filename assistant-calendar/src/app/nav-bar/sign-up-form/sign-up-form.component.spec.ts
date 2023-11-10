import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpFormComponent } from './sign-up-form.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/email.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
      providers: [
        FormBuilder,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: EmailService, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
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
    if (control) { // Check if control is not null
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
        type: 'Student', // This is now included
        username: 'tester', // This is now included
        password: 'Password123'
      });
      httpClientSpy.post.and.returnValue(of({}));
      component.submit();
      expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });


    it('should not submit form if invalid', () => {
      let control = component.signUpForm;
      control.setValue({
        email: 'invalidEmail',
        firstName: 'John',
        lastName: 'Doe',
        type: 'Student', // This is now included
        username: 'tester', // This is now included
        password: 'short'
      });
      component.submit();
      expect(httpClientSpy.post.calls.count()).toBe(0, 'no calls');
    });

  it('should handle error on user creation', () => {
    httpClientSpy.post.and.returnValue(throwError({ status: 422, error: ['User exists'] }));
    component.createUser({});
    expect(snackBarSpy.open.calls.count()).toBe(1, 'one call');
    expect(snackBarSpy.open.calls.first().args[0]).toContain('User exists');
  });
});
