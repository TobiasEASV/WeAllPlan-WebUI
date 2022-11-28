import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Clipboard} from '@angular/cdk/clipboard';
import * as http from "http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";

const randomize  = require('randomatic');

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

  newGeneratePassword: string = "";
  hiddenPasswordString: string = "";
  hidePassword: boolean = false;
  PasswordCopied: boolean = false;

  constructor(public http: HttpService, private clipboard: Clipboard, private matSnackbar: MatSnackBar) {}

  ngOnInit(): void {}

  Register() {
    if (this.Password == this.RepeatedPassword){
      this.http.Register({password: this.Password, email: this.Email, name: this.Name});
    }
  }

  GeneratePassword() {
    this.newGeneratePassword = randomize('*', 20);
    this.Password = this.newGeneratePassword
    this.RepeatedPassword = this.newGeneratePassword
    this.clipboard.copy('')
    this.PasswordCopied = false;
  }

  CopyToClipboard(){
    this.clipboard.copy(this.newGeneratePassword)
    this.matSnackbar.open("Copy to clipboard", 'close', {duration: 2000});
    this.PasswordCopied = true;

  }

  ShowPassword(){
    this.hidePassword = !this.hidePassword;
  }
}
