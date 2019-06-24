import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn = false;
  private statusListenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.isUserLoggedIn = true;
    }
    this.statusListenerSubs = this.authService
      .getStatusListener()
      .subscribe(isUserLoggedIn => {
        this.isUserLoggedIn = isUserLoggedIn;
      });
  }

  ngOnDestroy() {
    this.statusListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
