import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css',
              '../form-styles.css']
})
export class SignUpFormComponent {
  getFormData(): Object {
    var signUpForm = document.querySelector('.sign-up-form') as HTMLElement;
    var email = signUpForm.querySelector('.email') as HTMLInputElement,
        first = signUpForm.querySelector('.first-name') as HTMLInputElement,
        last = signUpForm.querySelector('.last-name') as HTMLInputElement,
        pass = signUpForm.querySelector('.password') as HTMLInputElement;

    return {
      email: email.value,
      name: {
        firstName: first.value,
        lastName: last.value
      },
      password: pass.value
    };
  }

  getFormDataTest() {
    console.log(this.getFormData());
  }
}
