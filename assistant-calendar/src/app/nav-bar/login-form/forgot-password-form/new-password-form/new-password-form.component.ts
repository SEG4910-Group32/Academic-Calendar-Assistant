import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';

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

  email: string = "";

  /**
   * Updates the user in the database corresponding to the local email and
   * regenerates saltSecret
   * @param pass string new password
   */
  updatePassword = async (pass: string) => {
    let user = {
      email: this.email,
      password: pass
    };

    this.http.patch("http://localhost:3000/user/update/pass", user).subscribe(res => {
      console.log(res);
      this.dialogRef.close('openSignIn');
    }, err => {
      console.log("error");
    });
  };


  /**
   * Retrieves the email entered earlier in the forgot password form
   */
  ngOnInit() {
    this.data.currLocalEmail.subscribe(email => {
      this.email = email;
    });
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NewPasswordFormComponent>,
    public http: HttpClient,
    private data: DataService
  ) {}
  
  validatePasswords(): boolean {
    return this.newPasswordForm.controls.password.value === this.newPasswordForm.controls.confirm.value;
  }

  /**
   * Updates password if the password in the password and confirm fields match
   */
  submit(): void {
    let password = this.newPasswordForm.controls.password.value,
        confirm = this.newPasswordForm.controls.confirm.value;

    if (password && confirm) {
      if (this.validatePasswords()) {
        this.updatePassword(password);
      }
      else {
        console.log("passwords do not match");
      }
    }

  }
}
