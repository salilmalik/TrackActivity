import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-behaviour",
  templateUrl: "./behaviour.component.html",
  styleUrls: ["./behaviour.component.css"]
})
export class BehaviourComponent implements OnInit {
  behaviourLogs: any;
  private behaviourListenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    setInterval(() => {
      this.authService.getBehaviourLogs();
    }, 2000);
    this.behaviourListenerSubs = this.authService
      .getBehaviourListener()
      .subscribe(result => {
        this.behaviourLogs = result;
      });
  }
}
