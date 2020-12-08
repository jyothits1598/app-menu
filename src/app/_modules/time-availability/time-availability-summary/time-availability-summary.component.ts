import { Component, Input, OnInit } from '@angular/core';
import { TimeAvailability } from 'src/app/_modules/time-availability/_model/time-availability';
import { TimeAvailabilityService, TimeFormat } from '../_services/time-availability.service';

@Component({
  selector: 'app-time-availability-summary',
  templateUrl: './time-availability-summary.component.html',
  styleUrls: ['./time-availability-summary.component.scss']
})
export class TimeAvailabilitySummaryComponent implements OnInit {
  get format24hr() {
    return this.timeAvailabilityServ.getPreference() === TimeFormat.hrs24;
  }
  fmt12to24;
  monday: Array<TimeAvailability>;
  tuesday: Array<TimeAvailability>;
  wednesday: Array<TimeAvailability>;
  thursday: Array<TimeAvailability>;
  friday: Array<TimeAvailability>;
  saturday: Array<TimeAvailability>;
  sunday: Array<TimeAvailability>;

  constructor(private timeAvailabilityServ: TimeAvailabilityService) {
    this.fmt12to24 = this.timeAvailabilityServ.fmt12to24;
  }
  @Input() set availabilities(availabilities: Array<TimeAvailability>) {
    if (availabilities) {
      this.dataRefresh();
      setTimeout(() => {
        availabilities.forEach((avai) => {
          switch (avai.day.toLowerCase()) {
            case 'monday':
              this.monday.push(avai)
              break;
            case 'tuesday':
              this.tuesday.push(avai)
              break;
            case 'wednesday':
              this.wednesday.push(avai)
              break;
            case 'thursday':
              this.thursday.push(avai)
              break;
            case 'friday':
              this.friday.push(avai)
              break;
            case 'saturday':
              this.saturday.push(avai)
              break;
            case 'sunday':
              this.sunday.push(avai)
              break;
            default:
              break;
          }
        })
      }, 0);
    }
  }

  dataRefresh() {
    this.monday = [];
    this.tuesday = [];
    this.wednesday = [];
    this.thursday = [];
    this.friday = [];
    this.saturday = [];
    this.sunday = [];
  }

  getTimeStr(a: TimeAvailability) {
    if(a.startTime === '12:00AM' && a.endTime === '12:00AM') return '24 Hours'
    if (this.format24hr) {
      return this.fmt12to24(a.startTime) + '-' + this.fmt12to24(a.endTime);
    } else return a.startTime + '-' + a.endTime;
  }

  ngOnInit(): void {
    this.dataRefresh();
  }

}
