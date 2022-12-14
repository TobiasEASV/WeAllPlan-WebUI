import {Component} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Event, NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import jwtDecode from "jwt-decode";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentRoute: string = "";

  constructor(private router: Router,
              public http: HttpService,
              private snackBar: MatSnackBar) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    let token = localStorage.getItem('token') as any;
    if (token) {
      let decoded = jwtDecode(token) as any;
      let currentDate = new Date();
      if (decoded.exp) {
        let expiry = new Date(decoded.exp * 1000);

        if (currentDate < expiry) {
          this.http.ReadUserFromStorage(token);
        } else if (currentDate > expiry) {
          localStorage.clear();
          alert("You have been logged out, login to continue.")
          //TODO
        }
      }
    }
  }


  logOut() {
    localStorage.clear();
    this.http.IsUser = false;
    this.http.user.UserName = '';
    this.http.user.Email = '';
    this.http.user.Id = '';

    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }
}
