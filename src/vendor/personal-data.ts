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
    permanentAddress: string,
    permanentAddressCity: string,
    permanentAddressState: string,
    permanentAddressPhone: string,
    permanentAddressZIP: string,
    permanentAddressCellPhone: string
}

// TODO ?
export interface OldHCISZIP {
    LastName: string,
    FirstName: string,
    MiddleName: string
}