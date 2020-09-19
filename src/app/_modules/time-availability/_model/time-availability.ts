export class TimeAvailability {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    markedAsClose: boolean;

    constructor(
        id: number,
        day: string,
        startTime: string,
        endTime: string,
        markedAsClose: boolean,
    ) {
        this.id = id;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.markedAsClose = markedAsClose;
    }
}

export function ReadAvailability(availability: any): Array<TimeAvailability> {
    let result: Array<TimeAvailability> = []
    for (const a in availability) {
        result.push(new TimeAvailability(
            availability[a].menu_timings_id
            , availability[a].days
            , availability[a].start_time
            , availability[a].end_time
            , availability[a].marked_as_closed ? true : false))
    }
    return result;
}

export function AvailabilityToBackend(availability: Array<TimeAvailability>): Array<any> {
    let data = [];
    availability.forEach((a) => {
        let menuTime: any = {};
        menuTime.days = a.day;
        menuTime.start_time = a.startTime;
        menuTime.end_time = a.endTime;
        menuTime.marked_as_closed = a.markedAsClose;
        // menuTime.active_flag = 0;
        data.push(menuTime);
    })
    return data;
}
