export class StoreMenu {
    id: number;
    name: string;
    availability : Array<StoreMenuTime>;

    constructor(){
        this.availability = new Array<StoreMenuTime>();
    }
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