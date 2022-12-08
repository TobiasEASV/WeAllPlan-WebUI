import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  TryWAP() {
    if (this.http.IsUser){
      this.router.navigate(['CreateEvent']);
    } else {
      this.router.navigate(['Login']);
    }
  }
}
