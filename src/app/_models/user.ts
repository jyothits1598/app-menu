export class User {
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    role: UserRole;
}

export enum UserRole {
    Admin = 1,
    Owner = 2,
    Staff = 6
}