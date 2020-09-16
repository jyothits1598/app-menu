export class StoreMenu {
    id: number;
    name: string;
    iscustomavailability: number;
    availability : Array<StoreMenuTime>;
    constructor(id: number, name: string, iscustomavailability: number, availability){
        this.id = id;
        this.name = name;
        this.iscustomavailability = iscustomavailability;
        this.availability = availability;
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

export class Storedetails {
    id: number;
    storeName: string;
    logoUrl:string;
    activeStatus: string;
    nextStep: string;

    constructor(
        id: number,
        storeName: string,
        logoUrl: string,
        activeStatus: string,
        nextStep: string
    ){
        this.id = id;
        this.storeName = storeName;
        this.logoUrl = logoUrl;
        this.activeStatus = activeStatus;
        this.nextStep = nextStep
    }
}