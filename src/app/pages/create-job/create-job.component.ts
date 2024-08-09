import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService, JobService, UserService } from '../../modules/api-module/services';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../error-handler.service';
import { AttachmentDto, CompanyDto } from '../../modules/api-module/models';
import { SuccessDialogService } from '../../success-dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.scss',
  providers: [DatePipe]
})
export class CreateJobComponent {
  createJobForm!: FormGroup;
  companies: CompanyDto[] = [];
  filteredCompanies: CompanyDto[] = [];
  dropdownOpen: boolean = false;
  selectedCompanyName: string | null = null;
  selectedCompanyLogo: string | null = null;
  company: CompanyDto | null = null;
  loading: boolean = false;
  page: number = 0;
  pageSize: number = 20;
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
    private datePipe: DatePipe
  ) {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    this.createJobForm = this.fb.group({
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
    this.companyService.getAllCompaniesAsList().subscribe((companyList) => {
      this.companies = companyList;
    });
  }

  // Address form group
  get address() {
    return this.createJobForm.get('address') as FormGroup;
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
    return this.createJobForm.get('benefits') as FormArray;
  }
  get languages() {
    return this.createJobForm.get('languages') as FormArray;
  }
  get responsibilities() {
    return this.createJobForm.get('responsibilities') as FormArray;
  }
  get skills() {
    return this.createJobForm.get('skills') as FormArray;
  }

  // Other form controls
  get companyId() {
    return this.createJobForm.get('companyId') as FormControl;
  }
  get description() {
    return this.createJobForm.get('description') as FormControl;
  }
  get experience() {
    return this.createJobForm.get('experience') as FormControl;
  }
  get featured() {
    return this.createJobForm.get('featured') as FormControl;
  }
  get jobType() {
    return this.createJobForm.get('jobType') as FormControl;
  }
  get levelOfEducation() {
    return this.createJobForm.get('levelOfEducation') as FormControl;
  }
  get contractType() {
    return this.createJobForm.get('contractType') as FormControl;
  }

  get salary() {
    return this.createJobForm.get('salary') as FormControl;
  }
  get title() {
    return this.createJobForm.get('title') as FormControl;
  }
  get searchCompany() {
    return this.createJobForm.get('searchCompany') as FormControl;
  }

  onSubmit() {
    if (this.createJobForm.valid) {
      this.removeNullValues(this.skills);
        this.removeNullValues(this.languages);
        this.removeNullValues(this.benefits);
        this.removeNullValues(this.responsibilities);
      this.jobService.createJob({ body: this.createJobForm.value }).subscribe(
        (response) => {
          this.openSuccessDialog();
        },
        (error: HttpErrorResponse) => {
          console.error('Creating job failed', error);
          this.handleError(error);
        }
      );
    } else {
      this.createJobForm.markAllAsTouched();
    }
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
    this.createJobForm.patchValue({ companyId: company.id });
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
        'Create Job  Successful',
        'Job is created. You will return to the list of jobs'
      )
      .subscribe(() => {
        this.router.navigate(['/jobs']);
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
}
