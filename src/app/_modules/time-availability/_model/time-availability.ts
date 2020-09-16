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
