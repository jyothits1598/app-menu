import { Injectable } from '@angular/core';

export enum TimeFormat {
  hrs12 = '12HR',
  hrs24 = '24HR'
}

@Injectable()
export class TimeAvailabilityService {
  formatPreference: TimeFormat;

  getPreference(): TimeFormat | undefined {
    return this.formatPreference;
  }

  setPrefence(fmt: TimeFormat) {
    this.formatPreference = fmt;
    localStorage.setItem('timePreference', fmt);
  }

  fmt12to24(time: string): string {
    let hours = parseInt(time.substr(0, 2));
    let parsedHours;
    if (time.substr(5, 2) === 'PM') {
      // if (hours === 12) return 12;
      // else return hours + 12;
      parsedHours = (hours === 12 ? 12 : hours + 12) + time.substr(2, 3);
    } else {
      // if (hours === 12) return 0;
      // else return hours;
      parsedHours = (hours === 12 ? 0 : hours) + time.substr(2, 3);
    }
    return parsedHours.length === 4 ? '0' + parsedHours : parsedHours;
  }
  constructor() {

    let pref = localStorage.getItem('timePreference');
    console.log('inside time availabilty constructor', pref);
    if (pref) {
      this.formatPreference = pref === '24HR' ? TimeFormat.hrs24 : TimeFormat.hrs12;
    }
  }
}
