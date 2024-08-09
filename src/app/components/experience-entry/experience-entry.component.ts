import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience-entry',
  templateUrl: './experience-entry.component.html',
  styleUrl: './experience-entry.component.scss'
})
export class ExperienceEntryComponent {
  @Input() experiences!: FormArray;
  errorMessage: string = '';
  private updating = false;
  @Input() formDisabled: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.experiences.valueChanges.subscribe((value) => {
      this.dateRangeValidator(value[0].startDate, value[0].endDate);

      if (!this.updating) {
        this.updating = true;
        

        if (value.length > 0 && value[0].startDate !== null && value[0].endDate !== null) {
          const firstQualification = this.experiences.at(0) as FormGroup;
          if (!this.dateRangeValidator(value[0].startDate, value[0].endDate)) {
            firstQualification.patchValue({
              startDate: '' 
            }, { emitEvent: false }); 
          }
        }

        this.updating = false;
      }
    });
  }

  get experienceControls(): FormControl[] {
    var result: FormControl[] = this.experiences.controls.map((experience) => experience as FormControl);
    return result;
  }

  dateRangeValidator(startDate: string, endDate: string): boolean {
    if (startDate !== null && endDate !== null) {
    if(new Date(startDate) > new Date(endDate)) {
      this.errorMessage = 'End date must be after the start date.';
    }else {
      this.errorMessage = '';
    }
  }
    return new Date(startDate) <= new Date(endDate);
  }

  
  addExperience(): void {

    const experienceFormGroup = this.fb.group({
      companyName: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      jobTitle: new FormControl(null, Validators.required),
      roleDescription: new FormControl(null, Validators.required)
    });
  
    this.experiences.push(experienceFormGroup);
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  getNestedControl(parentControl: FormControl, ...params: string[]): FormControl {
    let control: FormControl = parentControl;
    for (let param of params) {
      control = control.get(param) as FormControl;
    }
    return control;    
  }

   jobTitle(index: number) {
    return this.getNestedControl(this.experienceControls[index], 'jobTitle');
  }
  roleDescription(index: number) {
    return this.getNestedControl(this.experienceControls[index], 'roleDescription');
  }
  companyName(index: number) {
    return this.getNestedControl(this.experienceControls[index], 'companyName');
  }
  startDate(index: number) {
    return this.getNestedControl(this.experienceControls[index],'startDate');
  }
  endDate(index: number) {
    return this.getNestedControl(this.experienceControls[index],'endDate');
  }


}
