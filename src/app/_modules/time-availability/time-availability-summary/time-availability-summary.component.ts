import { Component, Input, OnInit } from '@angular/core';
import { TimeAvailability } from 'src/app/_modules/time-availability/_model/time-availability';

@Component({
  selector: 'app-time-availability-summary',
  templateUrl: './time-availability-summary.component.html',
  styleUrls: ['./time-availability-summary.component.scss']
})
export class TimeAvailabilitySummaryComponent implements OnInit {

  monday: Array<TimeAvailability>;
  tuesday: Array<TimeAvailability>;
  wednesday: Array<TimeAvailability>;
  thursday: Array<TimeAvailability>;
  friday: Array<TimeAvailability>;
  saturday: Array<TimeAvailability>;
  sunday: Array<TimeAvailability>;

  constructor() { }
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

  ngOnInit(): void {
    this.dataRefresh();
  }

}
