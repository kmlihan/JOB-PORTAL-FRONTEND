import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { JobDto } from '../../modules/api-module/models';
import { JobService } from '../../modules/api-module/services';

@Component({
  selector: 'app-create-job-page',
  templateUrl: './create-job-page.component.html',
  styleUrl: './create-job-page.component.scss'
})
export class CreateJobPageComponent {
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      language: new FormControl(null, Validators.required),
      experience: new FormControl(0, Validators.required),
      salary: new FormControl(0, Validators.required),
      skills: new FormArray([]),
      languages: new FormArray([]),
      responsibilities: new FormArray([]),
      benefits: new FormArray([]),
      contractType: new FormControl(null, Validators.required),
      companyId: new FormControl(null, Validators.required),
      jobType: new FormControl(null, Validators.required),
      levelOfEducation: new FormControl(null, Validators.required),
      archived: new FormControl(false),
      featured : new FormControl(false),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const job = this.prepareJob();
    this.jobService.createJob({ body: job }).subscribe(result => {
      this.router.navigate(['/jobs']);
    });
  }

  prepareJob(): JobDto {
    const formModel = this.jobForm.value;
    const job: JobDto = {
      title: formModel.title,
      description: formModel.description,
      experience: formModel.experience,
      salary: formModel.salary,
      skills: formModel.skills as string[],
      languages: formModel.skills as string[],
      responsibilities: formModel.responsibilities as string[],
      benefits: formModel.benefits as string[],
      contractType: formModel.contractType,
      companyId: formModel.companyId,
      jobType: formModel.jobType,
      levelOfEducation: formModel.levelOfEducation,
      archived: formModel.archived,
      featured : formModel.isFeatured,


    };
    return job;
  }

  // Form Array Helpers
  addSkill(skill: string = ''): void {
    this.skills.push(new FormControl(skill));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }



 

  addResponsibility(responsibility: string = ''): void {
    this.responsibilities.push(new FormControl(responsibility));
  }

  removeResponsibility(index: number): void {
    this.responsibilities.removeAt(index);
  }

  addBenefit(benefit: string = ''): void {
    this.benefits.push(new FormControl(benefit));
  }

  removeBenefit(index: number): void {
    this.benefits.removeAt(index);
  }



  addLanguage(language: string = ''): void {
    this.languages.push(new FormControl(language));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  // Form Array Getters
  get skills(): FormArray {
    return this.jobForm.get('skills') as FormArray;
  }

  get roles(): FormArray {
    return this.jobForm.get('roles') as FormArray;
  }

  get responsibilities(): FormArray {
    return this.jobForm.get('responsibilities') as FormArray;
  }

  get benefits(): FormArray {
    return this.jobForm.get('benefits') as FormArray;
  }



  get languages(): FormArray {
    return this.jobForm.get('languages') as FormArray;
  }
}

