import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css',
              '../form-styles.css']
})
export class LoginFormComponent {
  getFormData(): Object {
    var loginForm = document.querySelector('.sign-in-form') as HTMLElement;
    var email = loginForm.querySelector('.email') as HTMLInputElement,
        pass = loginForm.querySelector('.password') as HTMLInputElement;

    return {
      email: email.value,
      password: pass.value
    }
  }

  getFormDataTest() {
    console.log(this.getFormData());
  }
}
