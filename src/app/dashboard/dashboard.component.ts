import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../types/user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";


let Event: Event[];
let User:User;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Events : Event[] = Event;
  User: User = User;
  UserHasEvents: boolean = false;
  constructor(public http: HttpService,private route: ActivatedRoute, private matSnackbar: MatSnackBar, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.Events = this.route.snapshot.data['Event'];
    this.User = this.http.user
    this.UserHasEvents = this.Events.length == 0;
  }

  DeleteEvent(event: Event) {
    var result = confirm("Want to delete: " + event.title)
    if (result)
    {
      if (event.id!=undefined) {
        this.http.deleteEvent(event.id, this.http.user.Id);
        // @ts-ignore
        this.Events = this.Events.filter((e:{id}) => e.id != event.id);
      }

    }

  }

  EditEvent(event: Event) {
    this.matSnackbar.open("You want to edit an event.", "close", {duration:2000})

  }

  CreateEvent() {
    this.router.navigate(['CreateEvent']);

  }

  ViewEventAnswers(event: Event) {
    if(event.id) {
      this.http.SelectedEventId = event.id
      this.router.navigate(['Answer'])
    }

  }
}
