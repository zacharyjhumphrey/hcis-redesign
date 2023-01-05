export interface PersonalData {
    lastName: string,
    firstName: string,
    middleName: string,
    preferredName: string,
    generation: string,
    campusEmail: string,
    alternateEmail: string,
    roomNumber: string,
    campusPOBox: number,
    localAddressLine1: string,
    localAddressLine2: string,
    localAddressLine3: string,
    localAddressHall: string,
    localAddressCityName: string,
    localAddressZIP: number,
    localAddressPhone: string,
    localAddressCellPhone: string,
    permanentAddressLine1: string,
    permanentAddressLine2: string,
    permanentAddressLine3: string,
    permanentAddressCity: string,
    permanentAddressState: string,
    permanentAddressPhone: string,
    permanentAddressZIP: string,
    permanentAddressCellPhone: string
}

// TODO Create an interface for what HCIS expects in the backend. middleware interface
export interface OldHCISZIP {
    LastName: string,
    FirstName: string,
    MiddleName: string
}