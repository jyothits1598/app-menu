export class StoreMenu {
    menuName: string;
    openingTime : [StoreMenuTime]
}

export class StoreMenuTime {
    day: string;
    startTime : string;
    endTime : string;
    markedAsClose : boolean;
    active: boolean;

    constructor(
        day: string,
        startTime: string,
        endTime: string,
        markedAsClose : boolean,
        active: boolean
    ){
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.markedAsClose = markedAsClose;
        this.active = active;
    }
}