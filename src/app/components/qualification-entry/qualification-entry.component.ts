import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-qualification-entry',
  templateUrl: './qualification-entry.component.html',
  styleUrls: ['./qualification-entry.component.scss']
})
export class QualificationEntryComponent implements OnInit {
  @Input() qualifications!: FormArray;
  @Input() formDisabled: boolean = false;
  errorMessage: string = '';
  private updating = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.qualifications.valueChanges.subscribe((value) => {
      this.dateRangeValidator(value[0].startDate, value[0].endDate);

      if (!this.updating) {
        this.updating = true;

        if (value.length > 0 && value[0].startDate !== null && value[0].endDate !== null) {
          const firstQualification = this.qualifications.at(0) as FormGroup;
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

  get qualificationControls(): FormControl[] {
    var result: FormControl[] = this.qualifications.controls.map((qualification) => qualification as FormControl);
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
  

  addQualification(): void {
 
    const qualificationFormGroup = this.fb.group({
      degree: new FormControl(null, Validators.required),
      startDate: new FormControl( null,Validators.required),
      endDate: new FormControl( null,Validators.required)
    });
    this.qualifications.push(qualificationFormGroup);
  }

  removeQualification(index: number): void {
    this.qualifications.removeAt(index);

  }

  getNestedControl(parentControl: FormControl, ...params: string[]): FormControl {
    let control: FormControl = parentControl;
    for (let param of params) {
      control = control.get(param) as FormControl;
    }
    return control;    
  }

  isDuplicate(degree: string, startDate: string, endDate: string): boolean {
    return this.qualifications.controls.some(control => {
      const qual = control.value;
      return qual.degree === degree && qual.startDate === startDate && qual.endDate === endDate;
    });
  }

  checkUniqueValues(): void {
    const uniqueQualifications = new Set();
    for (const control of this.qualifications.controls) {
      const qual = control.value;
      const key = `${qual.degree}-${qual.startDate}-${qual.endDate}`;
      if (uniqueQualifications.has(key)) {
        this.errorMessage = 'Duplicate qualifications found.';
        return;
      }
      uniqueQualifications.add(key);
    }
    this.errorMessage = '';
  }

  degree(index: number) {
    return this.getNestedControl(this.qualificationControls[index], 'degree');
  }
  startDate(index: number) {
    return this.getNestedControl(this.qualificationControls[index],'startDate');
  }
  endDate(index: number) {
    return this.getNestedControl(this.qualificationControls[index], 'endDate');
  }

}

