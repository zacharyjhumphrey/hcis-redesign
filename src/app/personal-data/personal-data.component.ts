import { Component, OnInit } from '@angular/core';
import { PersonalData } from 'src/vendor/personal-data';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.sass']
})
export class PersonalDataComponent implements OnInit {
  personData: PersonalData = {
    lastName: 'LAST NAME',
    firstName: 'FIRST NAME',
    middleName: 'MIDDLE NAME',
    preferredName: 'PREFFERED NAME',
    generation: 'GENERATION',
    campusEmail: 'CAMPUS EMAIL',
    alternateEmail: 'ALT EMAIL',
    roomNumber: 'ROOM NO',
    campusPOBox: 7263,
    localAddressLine1: 'LOCAL ADDRESS 1',
    localAddressLine2: 'LOCAL ADDRESS 2',
    localAddressLine3: 'LOCAL ADDRESS 3',
    localAddressHall: 'LOCAL ADDRESS HALL',
    localAddressCityName: 'LOCAL ADDRESS CITY',
    localAddressZIP: 38474,
    localAddressPhone: 'LOCAL ADDRESS PHONE',
    localAddressCellPhone: 'LOCAL ADDRESS CELL PHONE',
    permanentAddressLine1: 'PERMANENT ADDRESS LINE 1',
    permanentAddressLine2: 'PERMANENT ADDRESS LINE 2',
    permanentAddressLine3: 'PERMANENT ADDRESS LINE 3',
    permanentAddressCity: 'PERMANENT ADDRESS CITY',
    permanentAddressState: 'PERMANENT ADDRESS STATE',
    permanentAddressPhone: 'PERMANENT ADDRESS PHONE',
    permanentAddressZIP: 'PERMANENT ADDRESS ZIP',
    permanentAddressCellPhone: 'PERMANENT ADDRESS CELL PHONE',
  }

  constructor() { }

  ngOnInit(): void {
    // TODO Parse old PHP to get the student's current personal data
  }

  updatePersonalData(newPersonalData: PersonalData) {
    // TODO Send request to HCIS with updated information
  }


}
