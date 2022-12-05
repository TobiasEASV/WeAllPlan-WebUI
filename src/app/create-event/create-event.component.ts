import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';

import {FormControl} from "@angular/forms";
import {map, Observable, startWith, Subject} from "rxjs";
import {addDays, addHours} from 'date-fns';


@Component({
  selector: 'app-create-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateEventComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  // autocomplete input for EventSlot
  myControlStartTime = new FormControl('');
  myControlEndTime = new FormControl('');
  filteredOptions: Observable<string[]> | any;
  refresh = new Subject<void>();
  options: string[] = [
    '00.00', '00.15', '00.30', "00.45",
    '01.00', '01.15', '01.30', "01.45",
    '02.00', '02.15', '02.30', "02.45",
    '03.00', '03.15', '03.30', "03.45",
    '04.00', '04.15', '04.30', "04.45",
    '05.00', '05.15', '05.30', "05.45",
    '06.00', '06.15', '06.30', "06.45",
    '07.00', '07.15', '07.30', "07.45",
    '08.00', '08.15', '08.30', "08.45",
    '09.00', '09.15', '09.30', "09.45",
    '10.00', '10.15', '10.30', "10.45",
    '11.00', '11.15', '11.30', "11.45",
    '12.00', '12.15', '12.30', "12.45",
    '13.00', '13.15', '13.30', "13.45",
    '14.00', '14.15', '14.30', "14.45",
    '15.00', '15.15', '15.30', "15.45",
    '16.00', '16.15', '16.30', "16.45",
    '17.00', '17.15', '17.30', "17.45",
    '18.00', '18.15', '18.30', "18.45",
    '19.00', '19.15', '19.30', "19.45",
    '20.00', '20.15', '20.30', "20.45",
    '21.00', '21.15', '21.30', "21.45",
    '22.00', '22.15', '22.30', "22.45",
    '23.00', '23.15', '23.30', "23.45",
  ];

  constructor() {
  }


  ngOnInit() {
    this.filteredOptions = this.myControlStartTime.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredOptions = this.myControlEndTime.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  events: CalendarEvent[] = [
    {
      title: 'Resizable event',
      start: new Date(),
      end: addHours(new Date(),1 ), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      }
    }
  ];

  // filters time
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


}
