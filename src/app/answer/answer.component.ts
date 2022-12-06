import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";



let Event: Event


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {


  user = "";

  event: Event = Event
  InviteLink: string = "";

  constructor(public http: HttpService, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
      if(!this.http.IsUser){
        this.user = "John Do"
      }
        this.event = this.route.snapshot.data['Event'];
        this.user = this.http.user.Email

    }

  GenerateInviteLink(){
    this.http.GenerateInviteLink(this.http.SelectedEventId)
      .then(EncryptedInviteLink => this.InviteLink = environment.baseDomainUrl + "Answer/Share/" + EncryptedInviteLink )
  }

}
