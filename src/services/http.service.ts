import { Injectable } from '@angular/core';
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, config} from "rxjs";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
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

  user: User= {
    Email : '',
    UserName : '',
    Id : ''
  }
  IsUser: boolean = false;

  constructor(private matSnackbar: MatSnackBar,
              private router: Router) {
    customAxios.interceptors.response.use(
      response => {
        if (response.status ==201){
          this.matSnackbar.open("Event created.", 'close', {duration: 4000});
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status < 500){
          matSnackbar.open("Error: "+rejected.response.data,'close', {duration: 4000});
        } else if (rejected.response.status>499){
          this.matSnackbar.open("Something went wrong on our end.",'close', {duration: 4000});
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

  async Login(dto: any) {
    customAxios.post<string>('login', dto).then(successResult => {
      if (successResult.status >= 400 && successResult.status < 500 ){
        this.matSnackbar.open(successResult.statusText, undefined, {duration: 3000});
      } else if (successResult.status >= 200 && successResult.status < 400 ){{
          this.ReadUserFromStorage(successResult.data);
          localStorage.setItem('token', successResult.data);
          this.router.navigate(['./Dashboard'])
          this.matSnackbar.open("Welcome " + this.user.UserName, undefined, {duration: 3000})
      }}
    })
  }

  async Register(dto: { password: any; email: any; name: any }) {
    customAxios.post('/register', dto).then(successResult => {
      if (successResult.status >= 400 && successResult.status < 500 ){
        this.matSnackbar.open(successResult.data.preview, undefined, {duration: 3000});
      } else if (successResult.status >= 200 && successResult.status < 400 ){
        this.router.navigate(['./Login'])
        this.matSnackbar.open("You have been registered", undefined, {duration: 3000});
      }
    });
  }

  async GetEventToAnswer(EncryptedEventId: string | null =''): Promise<Event>{
     let successResult = await customAxios.get<Event>('/Event/GetEventToAnswer', { params: { EncryptedEventId: EncryptedEventId}})
      return successResult.data
  }

  async GetEventsFromUserID(UserId: string): Promise<Event[]>
  {
    let successResult = await customAxios.get<Event[]>('/Event/GetEventsFromUser', {params:{userId: UserId}})
    //console.log(successResult.data)
    return successResult.data
  }
  ReadUserFromStorage (StorageToken: string){
    let Token = jwtDecode(StorageToken) as User;

    this.user.Id = Token.Id;
    this.user.UserName = Token.UserName;
    this.user.Email = Token.Email;
    this.IsUser = true;
  }
}



