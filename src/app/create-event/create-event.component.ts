import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';


import { DOCUMENT } from '@angular/common';
import {colors} from "@angular-devkit/build-angular/src/utils/color";


@Component({
  selector: 'app-create-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateEventComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date('september 9 2021');
  CalendarView = CalendarView;

  // @ts-ignore
  constructor(@Inject(DOCUMENT) private document) {}

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {
      start: (new Date()),
      title: 'An event with no end date',
    }
  ];

  private readonly darkThemeClass = 'dark-theme';

}
