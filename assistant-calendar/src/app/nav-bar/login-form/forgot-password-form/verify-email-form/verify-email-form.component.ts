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

  ngOnInit() {
    console.log(this.generateConfirmationCode());
  }

  generateConfirmationCode(): string {
    let res = "";

    for (let i = 0; i < 6; i++) {
      let c = Math.floor(Math.random() * 89) + 33;
      res += String.fromCharCode(c);
    }

    return res;
  }

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
