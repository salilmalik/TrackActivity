import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/core";
import { BehaviourComponent } from "../behaviour/behaviour.component";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private statusListener = new Subject<boolean>();
  private behaviourListener = new Subject();
  isUserLoggedIn = false;
  private accountName: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _cookieService: CookieService
  ) {}

  getStatusListener() {
    return this.statusListener.asObservable();
  }

  getBehaviourListener() {
    return this.behaviourListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getAccountName() {
    return this.accountName;
  }

  getIsUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  register(accountName: string, password: string) {
    const user: User = {
      accountName: accountName,
      password: password,
      lastLogin: ""
    };
    this.http
      .post("http://localhost:3000/api/user/register", user)
      .subscribe(response => {
        this.router.navigate(["/login"]);
      });
  }

  login(accountName: string, password: string) {
    const user: User = {
      accountName: accountName,
      password: password,
      lastLogin: ""
    };
    this.http
      .post("http://localhost:3000/api/user/login", user)
      .subscribe(response => {
        const token = response["token"];
        const savedAccountName = response["accountName"];
        this.token = token;
        if (token) {
          this.isUserLoggedIn = true;
          this.statusListener.next(true);
          this.accountName = savedAccountName;
          localStorage.setItem("token", token);
          localStorage.setItem("accountName", savedAccountName);
          this._cookieService.put("accountName", savedAccountName);
          this.router.navigate(["/"]);
        }
      });
  }
  getBehaviourLogs() {
    this.http.get("http://localhost:3000/api/behaviour").subscribe(result => {
      this.behaviourListener.next(result);
    });
  }

  logout() {
    this.token = null;
    this.isUserLoggedIn = false;
    this.statusListener.next(false);
    localStorage.removeItem("token");
    localStorage.removeItem("accountName");
    this.router.navigate(["/"]);
  }
}
