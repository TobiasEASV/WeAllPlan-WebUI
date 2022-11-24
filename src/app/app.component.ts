import {Component} from '@angular/core';
import {HttpService} from "../services/http.service";
import {Router, Event, NavigationEnd} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";


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
  }

  route() {
    this.router.navigate(['./Home'])
  }

  logOut() {
    this.router.navigate(['Home']).then(() => {
      this.snackBar.open('You have now been logged out', undefined, {duration: 3000})
      localStorage.clear();
    })
    this.http.user.name = '';
    localStorage.clear();
  }

  logIn() {
    this.router.navigate(['Login']);
  }

}
