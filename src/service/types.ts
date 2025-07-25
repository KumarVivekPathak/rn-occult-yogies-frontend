export interface NameFixingDTO {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    fathers_name: string;
    mothers_name: string;
    spouse_name: string;
    mobile: string;
}

export interface NameSuggestionsDTO {
    id : number;
    firstName : string;
    name : string;
    firstNameSum : string;
    fullNameSum : string;
    fullNamePrediction : string;
    firstNamePrediction : string;
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    creationDate: string;
    mobileNumber?: string;
}

export interface NameNumerologyDTO {
    fullname : string;
    email : string;
    dob : string;
    gender : string;
    fathers_name ?: string;
    mothers_name ?: string;
    spouse_name ?: string;
    mobile : string;
}

export interface MobileNumerologyDTO {
    firstName : string;
    middleName ?: string;
    lastName : string;
    mobileNo : string;
    countryCode : string;
    dateOFBirth : string;
    emailId : string;
    gender : string;
    areaOfStruggle ?: number[];
}
