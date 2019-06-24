import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  constructor(public authService: AuthService) {}
  onRegister(form: NgForm) {
    this.authService.register(form.value.accountName, form.value.password);
  }
}
