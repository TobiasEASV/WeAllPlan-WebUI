import {Injectable} from '@angular/core';
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, config} from "rxjs";
import jwtDecode from "jwt-decode";
import {User} from "../app/types/user";
import {Event} from "../app/types/event";
import {environment} from "../environments/environment";
import {CalendarEvent} from "angular-calendar";
import {EventDTO} from "../app/types/eventDTO";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {CreateEvent} from "../app/types/CreateEvent";
import {Router} from "@angular/router";

export const customAxios = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  user: User = {
    Email: '',
    UserName: '',
    Id: ''
  }
  IsUser: boolean = false;
  SelectedEventId: string ='';

  constructor(private matSnackbar: MatSnackBar, private route: Router) {
    customAxios.interceptors.response.use(
      response => {
        if (response.status == 201) {
          this.matSnackbar.open("Event created.", 'close', {duration: 4000});
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status < 500) {
          matSnackbar.open("Error: " + rejected.response.data, 'close', {duration: 4000});
        } else if (rejected.response.status > 499) {
          this.matSnackbar.open("Something went wrong on our end.", 'close', {duration: 4000});
        }
        catchError(rejected);
      }
    )
    customAxios.interceptors.request.use(
      async config => {
        config.headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        return config;
      },
      error => {
        Promise.reject(error)
      });
  }


  async GenerateInviteLink(EventId: string): Promise<string>{
    let successResult = await customAxios.get<string>('/Event/GenerateInviteLink', { params: { EventId: EventId}})
    return successResult.data
  }

  async GetEncryptedEventToAnswer(EncryptedEventId: string | null =''): Promise<Event>{
    let successResult = await customAxios.get<Event>('/Event/GetEventFromInviteLink', { params: { EncryptedEventId: EncryptedEventId}})
    return successResult.data
  }

  async GetEventToAnswer(EventId: string | null = ''): Promise<Event> {
    let successResult = await customAxios.get<Event>('/Event/GetEvent', {params: {eventId: EventId}})
    return successResult.data
  }


  async GetEventsFromUserID(UserId: string): Promise<Event[]>
  {
    let successResult = await customAxios.get<Event[]>('/Event/GetEventsFromUser', {params:{userId: UserId}})

    return successResult.data
  }

  ReadUserFromStorage(StorageToken: string) {
    let Token = jwtDecode(StorageToken) as User;
    this.user.Id = Token.Id;
    this.user.UserName = Token.UserName;
    this.user.Email = Token.Email;
    this.IsUser = true
  }
  deleteEvent(EventId: string, UserId:string){
    let successResult = customAxios.delete('Event/DeleteEvent', {params:{eventId: EventId, userId:UserId}});

  }

  async GetEventSlotsFromEvent(EventId: string) {
    let successResult = await customAxios.get<Event>('/EventSlots/GetEventSlots', {params: {EventId: EventId}})
    return successResult.data
  }


  async saveEvent(event: CreateEvent) {
    await customAxios.post("/Event/CreateEvent", event)
      .then(() => {
        this.matSnackbar.open(event.title + " has been created", 'close', {duration: 4000});
        this.route.navigate(["/Dashboard"])
      });
  }
}
