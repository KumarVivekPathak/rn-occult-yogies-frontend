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

export interface DashaDTO {
    period: string;
    sequence: string;
    description: string;
}
  
export interface DashaDataDTO {
    rulingPlanet: string;
    dashas: DashaDTO[];
}

export interface MobileNumberDetailsDTO {
    dob : string,
    mobileNumber: string,
    mobileNumberCompound: string,
    mobileNumberTotal: string,
    recommendedMobileNumber: string,
    luckyColours: string[],
    unLuckeyColor: string[],
    luckeyNumber: number[],
    unLuckeyNumber: number[],
    neutralNumber: number[],
    missingNumber: number[],
    mobileCombination: string[],
    recomendation: string,
    prediction: string[],
    recommendedWallpaper: string,
  };
    
export interface MobileNumerologyResultsDTO {
    mobileNumberDetails: mobileNumberDetailsDTO,
    dashaData: DashaDataDTO,
}

