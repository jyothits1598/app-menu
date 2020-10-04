import { TimeAvailability } from 'src/app/_modules/time-availability/_model/time-availability';

export class StoreBasicDetails{
    id: number;
    name: string;
    address: string;
    cuisine_id : number;
    description : string;
    googleUrl : string;
    facebookUrl : string;
    imageUrl: string;
    openingHours: Array<TimeAvailability>
}