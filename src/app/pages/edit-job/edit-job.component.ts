import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../error-handler.service';
import { AttachmentDto, CompanyDto, JobDto } from '../../modules/api-module/models';
import { JobService, UserService, CompanyService, AuthService } from '../../modules/api-module/services';
import { SuccessDialogService } from '../../success-dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogService } from '../../confirm-dialog.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss',
  providers: [DatePipe]
})
export class EditJobComponent {
  job!:JobDto;
  editJobForm!: FormGroup;
  companies: CompanyDto[] = [];
  filteredCompanies: CompanyDto[] = [];
  dropdownOpen: boolean = false;
  selectedCompanyName: string | null = null;
  selectedCompanyLogo: string | null = null;
  company: CompanyDto | null = null;
  loading: boolean = false;
  page: number = 0;
  pageSize: number = 20;
  id!: string;

  editDropDown: boolean = true;
  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private cdRef: ChangeDetectorRef,
    private userService: UserService,
    private companyService: CompanyService,
    private successDialogService: SuccessDialogService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private authService: AuthService


  ) {
  
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    this.editJobForm = this.fb.group({
      address: this.fb.group({
        street: new FormControl(null, Validators.required),
        houseNumber: new FormControl(null, Validators.required),
        box: new FormControl(null),
        city: new FormControl(null, Validators.required),
        postalCode: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
      }),
      benefits: this.fb.array([]),
      companyId: new FormControl('', Validators.required),
      description: new FormControl(null, Validators.required),
      experience: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      featured: new FormControl(false),
      jobType: new FormControl(null, Validators.required),
      languages: this.fb.array([]),
      levelOfEducation: new FormControl(null, Validators.required),
      responsibilities: this.fb.array([]),
      salary: new FormControl(null, [Validators.required, Validators.min(0)]),
      skills: this.fb.array([]),
      title: new FormControl(null, Validators.required),
      contractType: new FormControl(null, Validators.required),
      createdDate: new FormControl(currentDate, Validators.required),
      updatedDate: new FormControl(currentDate, Validators.required)
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.jobService.getJobById({jobId:this.id}).subscribe(job => {
      this.job = job;
      this.patchFormValues(job);
      this.editJobForm.markAsUntouched(); 
        this.editJobForm.disable();
    });
    this.companyService.getAllCompaniesAsList().subscribe((companyList) => {
      this.companies = companyList;
    });
  }
  



  mayEdit() {
    let possibleEdit =  this.authService.getUserRole() === 'ROLE_ADMIN'  || (this.authService.getUserRole() === 'ROLE_COMPANY' && this.authService.getUserId() === this.job.companyId);
    return possibleEdit;
  }
  mayApply() {
    return this.authService.getUserRole() === 'ROLE_USER';
  }

  loginToApply() {
      return this.authService.getUserRole() === '';
  }

  apply() {
    let userId = this.authService.getUserId();
    this.userService.applyToJob({userId:userId, jobId: this.id}).subscribe(()=> {
      this.successDialogService
      .showSuccess(
        'Apply   Successful',
        'You have applied successfully.'
      )
      .subscribe(() => {
        this.ngOnInit();
        this.editDropDown = true;
      });

    })
  }
  patchFormValues(job: any) {
    if (job) {
      Object.keys(job).forEach(key => {
        if (this.editJobForm.controls[key]) {
          const control = this.editJobForm.get(key);
          if (control instanceof FormControl && job[key] !== null) {
            control.patchValue(job[key]);
          } else if (control instanceof FormGroup && job[key] !== null) {
            this.patchFormGroup(control, job[key]);
          } else if (control instanceof FormArray && job[key] !== null && Array.isArray(job[key])) {
            this.patchFormArray(control, job[key]);
          }
        }
      });
    }
  }

  patchFormGroup(formGroup: FormGroup, values: any) {
    Object.keys(values).forEach(key => {
      if (formGroup.controls[key] && values[key] !== null) {
        const control = formGroup.get(key);
        if (control instanceof FormControl) {
          control.patchValue(values[key]);
        } else if (control instanceof FormGroup) {
          this.patchFormGroup(control, values[key]);
        }
      }
    });
  }

  patchFormArray(formArray: FormArray, values: any[]) {
    formArray.clear();
    values.forEach(value => {
      if (value !== null) {
        if (typeof value === 'object') {
          const group = new FormGroup({});
          Object.keys(value).forEach(key => {
            group.addControl(key, new FormControl(value[key]));
          });
          formArray.push(group);
        } else {
          formArray.push(new FormControl(value));
        }
      }
    });
  }

  onSubmit() {
    if (this.editJobForm.valid) {
      this.removeNullValues(this.skills);
        this.removeNullValues(this.languages);
        this.removeNullValues(this.benefits);
        this.removeNullValues(this.responsibilities);
      this.jobService.updateJob({ body: this.editJobForm.value , jobId: this.id}).subscribe(
        (response) => {
          this.openSuccessDialog();
        },
        (error: HttpErrorResponse) => {
          console.error('Creating job failed', error);
          this.handleError(error);
        }
      );
    } else {
      this.editJobForm.markAllAsTouched();
    }
  }

  downloadPdf() {
    this.jobService.downloadJobPdf({jobId: this.id}).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.job.title}-${this.job.companyName}.pdf`;
      a.click();
    })
  }
  deleteJob() {
    this.confirmDialogService.confirm('Confirm Delete', 'Are you sure you want to delete this job?').subscribe(result => {
      if (result) {
        this.jobService.deleteJob({ jobId: this.id }).subscribe(
          (response) => {
           
            this.router.navigate(['/jobs']);
          },
          (error) => {
            console.error('Error deleting job', error);
          }
        );
      }
    });
    }
  // Address form group
  get address() {
    return this.editJobForm.get('address') as FormGroup;
  }
  get street() {
    return this.address.get('street') as FormControl;
  }
  get houseNumber() {
    return this.address.get('houseNumber') as FormControl;
  }
  get box() {
    return this.address.get('box') as FormControl;
  }
  get city() {
    return this.address.get('city') as FormControl;
  }
  get postalCode() {
    return this.address.get('postalCode') as FormControl;
  }
  get country() {
    return this.address.get('country') as FormControl;
  }

  // Form arrays
  get benefits() {
    return this.editJobForm.get('benefits') as FormArray;
  }
  get languages() {
    return this.editJobForm.get('languages') as FormArray;
  }
  get responsibilities() {
    return this.editJobForm.get('responsibilities') as FormArray;
  }
  get skills() {
    return this.editJobForm.get('skills') as FormArray;
  }

  // Other form controls
  get companyId() {
    return this.editJobForm.get('companyId') as FormControl;
  }
  get description() {
    return this.editJobForm.get('description') as FormControl;
  }
  get experience() {
    return this.editJobForm.get('experience') as FormControl;
  }
  get featured() {
    return this.editJobForm.get('featured') as FormControl;
  }
  get jobType() {
    return this.editJobForm.get('jobType') as FormControl;
  }
  get levelOfEducation() {
    return this.editJobForm.get('levelOfEducation') as FormControl;
  }
  get contractType() {
    return this.editJobForm.get('contractType') as FormControl;
  }

  get salary() {
    return this.editJobForm.get('salary') as FormControl;
  }
  get title() {
    return this.editJobForm.get('title') as FormControl;
  }
  get searchCompany() {
    return this.editJobForm.get('searchCompany') as FormControl;
  }


  filterCompanies(event: Event): void {
    this.page = 0;
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
    if (searchTerm) {
      this.filteredCompanies = this.companies.filter(company =>
        company.name!.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, this.pageSize);
    } else {
      this.filteredCompanies = this.companies;
      this.company = null;
    }
  }

  loadCompanies(): void {
    this.loading = true;
    this.companyService.getAllCompaniesAsList().subscribe((companyList) => {
      this.companies = companyList;
      this.page = 0;
      this.filteredCompanies = this.companies.slice(this.page, this.pageSize);
      this.loading = false;
    });
  }

  onScroll(event: any): void {
    const threshold = 150; // Distance from bottom to trigger lazy load
    const position = event.target.scrollTop + event.target.offsetHeight;
    const height = event.target.scrollHeight;

    if (position > height - threshold && !this.loading) {
      this.loadMoreCompanies();
    }
  }

  loadMoreCompanies(): void {
    if (this.page * this.pageSize >= this.companies.length) return;

    this.loading = true;
    this.page++;
    const nextPageCompanies = this.companies.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
    this.filteredCompanies = [...this.filteredCompanies, ...nextPageCompanies];
    this.loading = false;
  }

  onSearchFocus(): void {
    if (this.companies.length === 0) {
      this.loadCompanies();
    } else {
      this.filteredCompanies = this.companies.slice(0, this.pageSize);
    }
    this.dropdownOpen = true;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCompany(company: CompanyDto): void {
    this.editJobForm.patchValue({ companyId: company.id });
    this.selectedCompanyName = company.name!;
    this.selectedCompanyLogo = this.getLogoUrl(company.logo!);
    this.dropdownOpen = false;
  }

  getLogoUrl(logo: AttachmentDto): string {
    if (logo && logo.data) {
      const base64String = Array.isArray(logo.data) ? logo.data.join('') : logo.data;
      return `data:${logo.fileType};base64,${base64String}`;
    }
    return '';
  }

  removeNullValues(formArray: FormArray): void {
    const toRemove: number[] = [];
    formArray.controls.forEach((control, index) => {
      if (control.value === null) {
        toRemove.push(index);
      }
    });
    for (let i = toRemove.length - 1; i >= 0; i--) {
      formArray.removeAt(toRemove[i]);
    }
  
  }
  openSuccessDialog(): void {
    this.successDialogService
      .showSuccess(
        'Update Job  Successful',
        'Job is updated.'
      )
      .subscribe(() => {
        this.ngOnInit();
        this.editDropDown = true;
      });
  }

  addBenefit(): void {
    this.benefits.push(new FormControl(null));
  }

  removeBenefit(index: number): void {
    this.benefits.removeAt(index);
  }

  addLanguage(): void {
    this.languages.push(new FormControl(null));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  addResponsibility(): void {
    this.responsibilities.push(new FormControl(null));
  }

  removeResponsibility(index: number): void {
    this.responsibilities.removeAt(index);
  }

  addSkill(): void {
    this.skills.push(new FormControl(null));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  async handleError(error: HttpErrorResponse): Promise<void> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'No connection. Verify your network.';
      } else {
        errorMessage = await this.getServerErrorMessage(error);
      }
    }
    this.errorHandler.showError(errorMessage);
  }

  private async getServerErrorMessage(
    error: HttpErrorResponse
  ): Promise<string> {
    try {
      const errorData =
        error.error instanceof Blob
          ? JSON.parse(await error.error.text())
          : error.error;
      return errorData.message || `Error: ${error.message}`;
    } catch (e) {
      return `Error: ${error.message}`;
    }
  }

  enableForm() {
    this.editJobForm.enable();
    this.editDropDown = false;
  }
  viewForm() {
    this.editJobForm.markAsUntouched(); 
    this.ngOnInit();
  }

}
