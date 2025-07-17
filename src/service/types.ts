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
