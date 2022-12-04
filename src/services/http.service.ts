import {Injectable} from '@angular/core';
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {User} from "../app/types/user";
import {Event} from "../app/types/event";
import {environment} from "../environments/environment";

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

  constructor(private matSnackbar: MatSnackBar) {
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

  async GetEventToAnswer(EncryptedEventId: string | null = ''): Promise<Event> {
    let successResult = await customAxios.get<Event>('/Event/GetEventToAnswer', {params: {EncryptedEventId: EncryptedEventId}})
    return successResult.data
  }

  ReadUserFromStorage(StorageToken: string) {
    let Token = jwtDecode(StorageToken) as User;

    this.user.Id = Token.Id;
    this.user.UserName = Token.UserName;
    this.user.Email = Token.Email;
    this.IsUser = true;
  }
}



