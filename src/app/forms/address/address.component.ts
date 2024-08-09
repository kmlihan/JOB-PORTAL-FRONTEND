import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryDto } from '../../modules/api-module/models';
import { CountryService } from '../../modules/api-module/services';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  @Input() addressFormGroup!: FormGroup;
  @Input() viewMode: string = 'edit' ;
  countriesList: CountryDto[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.getCountriesList().subscribe(
      response => {
        this.countriesList = response;
      },
      error => {
        console.error('Error fetching countries list', error);
      }
    );
  }

  get street() { return this.addressFormGroup.get('street')!; }
  get houseNumber() { return this.addressFormGroup.get('houseNumber')!; }
  get box() { return this.addressFormGroup.get('box')!; }
  get postalCode() { return this.addressFormGroup.get('postalCode')!; }
  get city() { return this.addressFormGroup.get('city')!; }
  get country() { return this.addressFormGroup.get('country')! as FormGroup; }

}
