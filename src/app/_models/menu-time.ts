export class StoreMenu {
    menuName: string;
    openingTime : [StoreMenuTime]
}

export class StoreMenuTime {
    days: string;
    startTime : Date;
    endTime : Date;
    MarkedAsClose : boolean;
    active: boolean;
}