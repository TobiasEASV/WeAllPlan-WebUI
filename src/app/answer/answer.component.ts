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

  Dates: string[] = ['user']
  answers: Map<string,number>= new Map();
  tempDates: string[] = ['user', ' 28/1 15:40' , '29/1 15:40', '2/2 15:40 - 16:00', '12/2 15:40', '13/2 15:40', '14/2 15:40', '15/2 15:40', '16/2 15:40', '17/2 15:40', '18/2 15:40', '19/2 15:40 - 16:00', '20/2 15:40', '21/2 15:40']
  AnswerDictionary: Map<string, number[]> = new Map();

  user = "";
  event: Event = Event
  InviteLink: string = "";
  response: number[] = [];

  constructor(public http: HttpService, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.http.IsUser) {
      this.user = "John Do"
    }
    this.event = this.route.snapshot.data['Event'];
    this.user = this.http.user.UserName

    this.event.eventSlots.forEach((eventSlot) => {
      this.Dates.push(this.formatStartDate(new Date(eventSlot.startTime))+ "-" + this.formatEndDate(new Date(eventSlot.endTime)))
      eventSlot.slotAnswers.forEach((slotanswer) => {
        if (this.AnswerDictionary.has(slotanswer.userName))
        {
          // @ts-ignore
          this.AnswerDictionary.get(slotanswer.userName).push(slotanswer.answer)
        }
        else{
          this.AnswerDictionary.set(slotanswer.userName, [slotanswer.answer])
        }

      })
    })
    this.response = new Array(this.Dates.length - 1).fill(0)
  }

  GenerateInviteLink() {
    this.http.GenerateInviteLink(this.http.SelectedEventId)
      .then(EncryptedInviteLink => this.InviteLink = environment.baseDomainUrl + "Answer/Share/" + EncryptedInviteLink)
  }
  changeResponse(response: number) {
    console.log(response)
    console.log(this.response[response])
    if (this.response[response] == 0) {
      this.response[response] = 1;
    } else if (this.response[response] == 1) {
      this.response[response] = 2;
    } else if (this.response[response] == 2) {
      this.response[response] = 0;
    }
  }

  SaveSlotAnswers() {
    let map = new Map<any,number>()
    for(let i =0; i<this.event.eventSlots.length;i++)
    {
      map.set(this.event.eventSlots[i],this.response[i])
    }
    console.log(map)
  }

  formatStartDate(calendarEvent: Date) {
    let startDate = (''+calendarEvent).slice(0, 15);

    let startHour = '' + calendarEvent.getHours();
    startHour = ('0' + startHour).slice(-2);

    let startMinute = '' + calendarEvent.getMinutes();
    startMinute = ('0' + startMinute).slice(-2);

    return startDate + ' - ' + startHour + '.' + startMinute;
  }

  formatEndDate(calendarEvent: Date) {

    let endDate;
    let endHour;
    let endMinute;

      endDate = (''+calendarEvent).slice(0, 15);

      endHour = '' + calendarEvent.getHours();
      endHour = ('0' + endHour).slice(-2);

      endMinute = '' + calendarEvent.getMinutes();
      endMinute = ('0' + endMinute).slice(-2);


    return endDate + ' - ' + endHour + '.' + endMinute;
  }


}

