import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AnswerComponent} from "../answer.component";

@Component({
  selector: 'app-guest-credential-dialog',
  templateUrl: './guest-credential-dialog.component.html',
  styleUrls: ['./guest-credential-dialog.component.css']
})
export class GuestCredentialDialogComponent implements OnInit {

  GuestEmail: string = ''
  GuestName: string = ''

  constructor(public dialogRef: MatDialogRef<AnswerComponent>) {}

  onClose(): void {
    this.dialogRef.close([this.GuestEmail, this.GuestName]);
  }

  ngOnInit(): void {
  }
}
