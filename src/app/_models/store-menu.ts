export class StoreMenu {
    id: number;
    name: string;
    availability : Array<StoreMenuTime>;
    constructor(id: number, name: string, availability){
        this.id = id;
        this.name = name;
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
    activeFlag: boolean;
    nextStep: string;

    constructor(
        id: number,
        storeName: string,
        logoUrl: string,
        activeFlag: boolean,
        nextStep: string
    ){
        this.id = id;
        this.storeName = storeName;
        this.logoUrl = logoUrl;
        this.activeFlag = activeFlag;
        this.nextStep = nextStep
    }
}