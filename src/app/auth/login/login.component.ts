import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(public authService: AuthService) {}
  onLogin(form: NgForm) {
    this.authService.login(form.value.accountName, form.value.password);
  }
}
