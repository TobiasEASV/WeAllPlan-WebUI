import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Email: any;
  Password: any;
  RepeatedPassword: any;
  Name: any;

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }

  Register() {
    if (this.Password == this.RepeatedPassword){
      this.http.Register({password: this.Password, email: this.Email, name: this.Name});
    }
  }
}
