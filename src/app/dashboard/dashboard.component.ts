import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  isUserLoggedIn = false;
  private statusListenerSubs: Subscription;
  accountName: string;
  token: string;
  stackoverflow =
    "https://stackoverflow.com/questions/tagged/java";
  constructor(private authService: AuthService) {
    const token = localStorage.getItem("token");
    if (token) {
      this.isUserLoggedIn = true;
      this.token = token;
      this.accountName = localStorage.getItem("accountName");
    }
  }

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.isUserLoggedIn = true;
      this.token = token;
      this.accountName = localStorage.getItem("accountName");
    }
    this.statusListenerSubs = this.authService
      .getStatusListener()
      .subscribe(isUserLoggedIn => {
        this.isUserLoggedIn = isUserLoggedIn;
        this.token = this.authService.getToken();
        this.accountName = this.authService.getAccountName();
      });
  }

  ngOnDestroy() {
    this.statusListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
