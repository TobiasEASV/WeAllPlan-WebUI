import {Component, Injectable, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Event} from "../types/event";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AnswerResolver} from "../../services/resolvers.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  Event: Event | undefined

  Data: any | undefined;

  EventId: string ='';


  constructor(public http: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.Data = this.route.snapshot
    console.log(this.Data)


  }

}
