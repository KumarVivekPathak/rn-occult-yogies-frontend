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

export interface ListItemAPIDTO {
    id : number;
    custId : number;
    wallId : string;
    first_name : string;
    middle_name : string | null;
    last_name : string;
    date_of_birth : string;
    place_of_birth : string | null;
    time_of_birth : string | null;
    mobile_no : string;
    countryCode : string;
    email : string;
    send_email : number;
    company_name : string | null;
    gender : string;
    created_at : string;
    updated_at : string;
    prep : string | null;
    user_email : string;
    user_name : string;
    mobile_id : number

}

export interface MobileNumerologyReportDTO {
    id : string;
    name : string;
}
    
