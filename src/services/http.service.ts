import { Injectable } from '@angular/core';
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {User} from "../app/types/user";

export const customAxios = axios.create({
  baseURL: 'https://localhost:7158/',
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
          this.matSnackbar.open("Welcome", undefined, {duration: 3000})
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

  ReadUserFromStorage (StorageToken: string){
    let Token = jwtDecode(StorageToken) as User;
    console.log(Token);

    this.user.Id = Token.Id;
    this.user.UserName = Token.UserName;
    this.user.Email = Token.Email;
    this.IsUser = true;
  }
}
