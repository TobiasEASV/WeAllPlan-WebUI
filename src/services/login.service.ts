import {Injectable, NgZone} from '@angular/core';
import axios from "axios";
import {environment} from "../environments/environment";
import {HttpService} from "./http.service";
import {catchError, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
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
export class LoginService {

  constructor(private http: HttpService,
              private matSnackbar: MatSnackBar,
              private router: Router,
              private ngZone: NgZone) {
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

  async Login(dto: any) {
    customAxios.post<string>('/login', dto).then(successResult => {
      if (successResult.status >= 400 && successResult.status < 500 ){
        this.matSnackbar.open(successResult.statusText, undefined, {duration: 3000});
      } else if (successResult.status >= 200 && successResult.status < 400 ){{
        this.http.ReadUserFromStorage(successResult.data);
        localStorage.setItem('token', successResult.data);
        this.router.navigate(['./Dashboard'])
        this.matSnackbar.open("Welcome " + this.http.user.UserName, undefined, {duration: 3000})
      }}
    })
  }

  async LogInWithGoogle(credential: string){
    customAxios.post<any>('/login/LoginWithGoogle', {credential: credential}).then(successResult => {
      if (successResult.status >= 400 && successResult.status < 500 ){
        this.matSnackbar.open(successResult.statusText, undefined, {duration: 3000});
      } else if (successResult.status >= 200 && successResult.status < 400 ){{
        this.http.ReadUserFromStorage(successResult.data);
        localStorage.setItem('token', successResult.data);
        this.ngZone.run(() => {
          this.router.navigate(['./Dashboard'])
        });
        this.matSnackbar.open("Welcome " + this.http.user.UserName, undefined, {duration: 3000})
      }}
    }).catch(reason => {

    })
  }
}
