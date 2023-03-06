import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-email-form',
  templateUrl: './verify-email-form.component.html',
  styleUrls: ['./verify-email-form.component.css',
              '../../../../form-styles.css']
})
export class VerifyEmailFormComponent {
  verifyCodeForm = this.fb.group({
    code: ['']
  });

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VerifyEmailFormComponent>
  ) {}

  submit(): void {
    console.log(this.verifyCodeForm.controls.code.value);
    this.dialogRef.close('openNewPassForm');
  }
}
