import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmailService } from 'src/app/email.service';
// declare let Email: any;

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
  code = "";

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VerifyEmailFormComponent>,
    public email: EmailService
  ) {}

  // ngOnInit() {
  //   this.email.sendConfirmationEmail("").subscribe(res => {
  //     this.code = res;
  //   });
  // }

  getFormValues(): Object {
    return {
      code: this.verifyCodeForm.controls.code.value
    }
  }

  submit(): void {
    console.log(this.getFormValues());
    this.openNewPasswordForm();
  }

  openNewPasswordForm(): void {
    this.dialogRef.close('openNewPass');
  }
}
