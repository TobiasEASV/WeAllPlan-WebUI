import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarNativeDateFormatter,
  CalendarView,
  DateFormatterParams
} from 'angular-calendar';
import {WeekViewHourSegment} from 'calendar-utils';
import {fromEvent, map, Observable, startWith, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {addDays, addMinutes, endOfWeek} from 'date-fns';
import {FormControl} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {EventSlot} from "../types/eventSlot";
import {EventDTO} from "../types/eventDTO";
import {SlotAnswer} from "../types/slotAnswer";
import {Event} from "../types/event";
import {CreateEvent, TimeSlot} from "../types/CreateEvent";


function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {

  // @ts-ignore
  override weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  // @ts-ignore
  override dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

let eventDTO: EventDTO;

let slotAnswer: SlotAnswer;


let eventSlot: EventSlot;
let eventSlotDTO: EventSlot[]

@Component({
  selector: 'app-create-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  styles: [
    `
      .disable-hover {
        pointer-events: none;
      }
    `,
  ]
})


@Injectable({
  providedIn: 'root'
})
export class CreateEventComponent extends CalendarNativeDateFormatter implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  refresh = new Subject<void>();
  // autocomplete input for EventSlot
  myControlStartTime = new FormControl('00:00');
  myControlEndTime = new FormControl('00:00');
  dragToCreateActive = false;
  weekStartsOn: 1 = 1; //This makes the calendar start on Mondays in week view
  filteredOptionsStartTime: Observable<string[]> | any;
  filteredOptionsEndTime: Observable<string[]> | any;



  //Event
  EventTitle: string = '';
  EventLocation: string = '';
  EventDescription: string = '';
  CalendarEvents: Array<CalendarEvent> = [];
  TimeSlotDTO: TimeSlot[] = [];


  public override weekViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }

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

  constructor(private cdr: ChangeDetectorRef, private http: HttpService) {
    // @ts-ignore
    super();
  }

  ngOnInit() {
    this.filteredOptionsStartTime = this.myControlStartTime.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredOptionsEndTime = this.myControlEndTime.valueChanges.pipe(
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
    this.refreshFunction();
  }

  // filters start time
  private _filter(value: string): string[] {
    const filterValueStart = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValueStart));
  }



  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      title: 'New event',
      start: segment.date,
      end: segment.date,
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      meta: {
        tmpEvent: true,
      },
    };
    this.CalendarEvents = [...this.CalendarEvents, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refreshFunction();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: any) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refreshFunction();
      });
  }

  refreshFunction() {
    this.CalendarEvents = [...this.CalendarEvents];
    this.cdr.detectChanges();
  }


  formatStartDate(calendarEvent: CalendarEvent<any>) {
    let startDate = ('' + calendarEvent.start).slice(0, 15);

    let startHour = '' + calendarEvent.start.getHours();
    startHour = ('0' + startHour).slice(-2);

    let startMinute = '' + calendarEvent.start.getMinutes();
    startMinute = ('0' + startMinute).slice(-2);

    return 'Start: ' + startDate + ' - ' + startHour + '.' + startMinute;
  }

  formatEndDate(calendarEvent: CalendarEvent<any>) {

    let endDate;
    let endHour;
    let endMinute;

    if (calendarEvent.end == undefined) {
      endDate = ('' + calendarEvent.start).slice(0, 15);
      endHour = ('0' + calendarEvent.start.getHours()).slice(-2);
      endMinute = ('0' + calendarEvent.start.getMinutes()).slice(-2);
    } else {
      endDate = ('' + calendarEvent.end).slice(0, 15);

      endHour = '' + calendarEvent?.end?.getHours();
      endHour = ('0' + endHour).slice(-2);

      endMinute = '' + calendarEvent?.end?.getMinutes();
      endMinute = ('0' + endMinute).slice(-2);
    }

    return 'End: ' + endDate + ' - ' + endHour + '.' + endMinute;
  }

  createEvent(date: Date) {
    let startDate = new Date(date)
    let endDate = new Date(date)

    startDate.setHours(parseInt(this.myControlStartTime.value?.slice(0, 2) || ''))
    startDate.setMinutes(parseInt(this.myControlStartTime.value?.slice(3, 5) || ''))

    endDate.setHours(parseInt(this.myControlEndTime.value?.slice(0, 2) || ''))
    endDate.setMinutes(parseInt(this.myControlEndTime.value?.slice(3, 5) || ''))

    const clickToCreateEvent: CalendarEvent = {
      title: 'New event',
      start: startDate,
      end: endDate,
      draggable: true,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
      meta: {
        tmpEvent: true,
      },
    };
    this.CalendarEvents = [...this.CalendarEvents, clickToCreateEvent];
  }

  DeleteEvent(calendarEvent: CalendarEvent<any>) {
    this.CalendarEvents = this.CalendarEvents.filter((event) =>
      (event.start != calendarEvent.start && event.end != calendarEvent.end));
  }


  saveEvent() {

    let timeslot: TimeSlot;

    this.CalendarEvents.forEach(value =>

      this.TimeSlotDTO.push(timeslot = {
        startTime: value.start,
        endTime: value.end
      }))

    let createEvent: CreateEvent = {
      title: this.EventTitle,
      description: this.EventDescription,
      location: this.EventLocation,
      ownerId: this.http.user.Id,
      timeSlots: this.TimeSlotDTO,


    }

    this.http.saveEvent(createEvent);
  }


}

