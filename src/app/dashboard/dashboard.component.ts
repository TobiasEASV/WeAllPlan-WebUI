import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";
import {ActivatedRoute} from "@angular/router";


let Event: Event[];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Events : Event[] = Event;
  constructor(public http: HttpService,private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.Events = this.route.snapshot.data['Event'];
  }

}
