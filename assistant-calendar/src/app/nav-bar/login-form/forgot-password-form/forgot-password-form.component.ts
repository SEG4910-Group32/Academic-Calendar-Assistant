import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css',
              '../../../form-styles.css']
})
export class ForgotPasswordFormComponent {
  forgotPasswordForm = this.fb.group({
    email: ['']
  });

  /**
   * Check if email corresponds to user, if so, store email and open verification (confirmation code) form
   * @param email string Email to check if it corresponds to a user
   */
  checkUserExists = async (email: string) => {
    this.http.get("http://localhost:3000/user/check/email/" + email).subscribe(res => {
      console.log(res);
      if (res) {
        this.data.updateLocalEmail(email);
        this.openVerificationForm();
      }
    }, err => {
      console.log("error");
    });
  };


  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForgotPasswordFormComponent>,
    public http: HttpClient,
    private data: DataService
  ) {}

  /**
   * Checks to see if email matches a user in the database.
   */
  submit(): void {
    let email = this.forgotPasswordForm.controls.email.value;

    console.log(this.forgotPasswordForm.value);

    if (email) {
      this.checkUserExists(email);
    }
  }

  openVerificationForm(): void {
    this.dialogRef.close('openVerification');
  }
}
