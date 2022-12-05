import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";
import {ActivatedRoute} from "@angular/router";
import {User} from "../types/user";


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
  constructor(public http: HttpService,private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.Events = this.route.snapshot.data['Event'];
    this.User = this.http.user
  }

  DeleteEvent(event: Event) {
    this.http.deleteEvent(event.id, this.http.user.Id);
    this.Events = this.Events.filter((e:{id:any}) => e.id != event.id);

  }

  EditEvent(event: Event) {

  }

  CreateEvent() {

  }
}
