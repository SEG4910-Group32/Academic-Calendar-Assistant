import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css',
              '../../../../form-styles.css']
})
export class NewPasswordFormComponent {
  newPasswordForm = this.fb.group({
    password: [''],
    confirm: ['']
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewPasswordFormComponent>
  ) {}
  

  getFormValues(): Object {
    return {
      password: this.newPasswordForm.controls.password.value,
      confirm: this.newPasswordForm.controls.confirm.value
    }
  }

  validateMatchingPasswords(): boolean {
    return this.newPasswordForm.controls.password.value === this.newPasswordForm.controls.confirm.value;
  }

  submit(): void {
    console.log(this.getFormValues());
    console.log(this.validateMatchingPasswords());
  }
}
