import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  KeepMeLoggedIn: boolean = false;

  constructor(public http: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  Register() {
    this.router.navigate(['Register']);
  }
}
