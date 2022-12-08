import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";
import {Clipboard} from '@angular/cdk/clipboard';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../types/user";
import {MatDialog} from "@angular/material/dialog";
import {GuestCredentialDialogComponent} from "./guest-credential-dialog/guest-credential-dialog.component";
import {SlotAnswer} from "../types/slotAnswer";


let Event: Event


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AnswerComponent implements OnInit {


  Dates: string[] = ['']
  answers: Map<string, number> = new Map();
  tempDates: string[] = ['user', ' 28/1 15:40', '29/1 15:40', '2/2 15:40 - 16:00', '12/2 15:40', '13/2 15:40', '14/2 15:40', '15/2 15:40', '16/2 15:40', '17/2 15:40', '18/2 15:40', '19/2 15:40 - 16:00', '20/2 15:40', '21/2 15:40']
  AnswerDictionary: Map<string, number[]> = new Map();
  LoggedInUser: User = {
    Email: '',
    UserName: '',
    Id: ''
  };
  user = "";
  event: Event = Event
  InviteLink: string = "";
  response: number[] = [];
  SlotAnswerName: string = "";
  SlotAnswerEmail: string = "";
  isEmail: boolean = this.SlotAnswerEmail.includes("@");

  constructor(public http: HttpService, private route: ActivatedRoute, private clipboard: Clipboard, private matSnackbar: MatSnackBar, private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {

    if (!this.http.IsUser) {
      this.user = "John Do"
    } else {
      this.LoggedInUser = this.http.user
    }

    this.event = this.route.snapshot.data['Event'];
    this.user = this.http.user.UserName
    if (this.event.eventSlots) {
      this.event.eventSlots.forEach((eventSlot) => {
        this.Dates.push(this.formatStartDate(new Date(eventSlot.startTime)) + "-" + this.formatEndDate(new Date(eventSlot.endTime)))
        eventSlot.slotAnswers.forEach((slotanswer) => {
          if (this.AnswerDictionary.has(slotanswer.userName)) {
            // @ts-ignore
            this.AnswerDictionary.get(slotanswer.userName).push(slotanswer.answer)
          } else {
            this.AnswerDictionary.set(slotanswer.userName, [slotanswer.answer])
          }
        })
      })
    }

    this.response = new Array(this.Dates.length - 1).fill(0)
  }

  GenerateInviteLink() {
    this.http.GenerateInviteLink(this.http.SelectedEventId)
      .then(EncryptedInviteLink => {
        this.InviteLink = (environment.baseDomainUrl + "Answer/Share/" + EncryptedInviteLink)
        this.clipboard.copy(this.InviteLink)
        this.matSnackbar.open(this.InviteLink + " copied to clipboard.", 'close', {duration: 5000});
      })

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

  async SaveSlotAnswers() {
    let slotanswers: SlotAnswer[] = []
    if (this.http.IsUser) {
      if (this.event.eventSlots)
        for (let i = 0; i < this.event.eventSlots.length; i++) {
          let slotanswer: SlotAnswer = {
            answer: this.response[i],
            email: this.http.user.Email,
            eventSlotId: this.event.eventSlots[i].id,
            id: 0,
            userName: this.http.user.UserName
          }
          slotanswers.push(slotanswer)
        }
      await this.http.saveSlotAnswer(slotanswers).then(() => {
        this.matSnackbar.open("Your answers has be registered", "close", {duration: 3000})
      })

    } else {
      let result = this.dialog.open(GuestCredentialDialogComponent);
      result.afterClosed().subscribe(async result => {
        if (this.event.eventSlots)
          for (let i = 0; i < this.event.eventSlots.length; i++) {
            let slotanswer: SlotAnswer = {
              answer: this.response[i],
              email: result[0],
              eventSlotId: this.event.eventSlots[i].id,
              id: 0,
              userName: result[1]
            }
            slotanswers.push(slotanswer)
            await this.http.saveSlotAnswer(slotanswers).then(() => {
                this.matSnackbar.open("Your answers has be registered", "close", {duration: 3000})
              }
            )

          }
      })
    }
  }

  formatStartDate(calendarEvent: Date) {
    let startDate = ('' + calendarEvent).slice(0, 15);

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

    endDate = ('' + calendarEvent).slice(0, 15);

    endHour = '' + calendarEvent.getHours();
    endHour = ('0' + endHour).slice(-2);

    endMinute = '' + calendarEvent.getMinutes();
    endMinute = ('0' + endMinute).slice(-2);


    return endDate + ' - ' + endHour + '.' + endMinute;
  }


}

