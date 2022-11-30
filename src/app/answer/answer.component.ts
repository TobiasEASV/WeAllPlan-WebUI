import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";
import {ActivatedRoute} from "@angular/router";



let Event: Event


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  event: Event = Event

  constructor(public http: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.event = this.route.snapshot.data['Event'];
    console.log(this.event.title)
  }

}
