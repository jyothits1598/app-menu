export class StoreMenu {
    id: number;
    name: string;
    availability : Array<StoreMenuTime>;

    constructor(){
        this.availability = new Array<StoreMenuTime>();
    }
}

export class StoreMenuTime {
    id: number;
    day: string;
    startTime : string;
    endTime : string;
    markedAsClose : boolean;

    constructor(
        id: number,
        day: string,
        startTime: string,
        endTime: string,
        markedAsClose : boolean,
    ){
        this.id = id;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.markedAsClose = markedAsClose;
    }
}