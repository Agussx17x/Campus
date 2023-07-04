import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isFormActive = false;

  signIn() {
    this.isFormActive = false;
    const a = document.getElementById('body');
    a?.classList.remove("active")
  }

  signUp() {
    this.isFormActive = true;
    const a = document.getElementById('body');
    a?.classList.add("active")
  }
}