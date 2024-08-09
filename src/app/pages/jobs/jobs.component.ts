import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { ErrorHandlerService } from '../../error-handler.service';
import { AuthService, CompanyService, CountryService, JobService } from '../../modules/api-module/services';
import { GetAllJobs$Params } from '../../modules/api-module/fn/job-service/get-all-jobs';
import { AttachmentDto, CompanyDto, CountryDto, JobDto } from '../../modules/api-module/models';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent {

  searchForm: FormGroup;
  companies: CompanyDto[] = [];
  countries: CountryDto[] = [];
  jobs: JobDto[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;  
  sort: string = 'lastModifiedDate,desc';
  pageSizes: number[] = [5, 10, 25, 50];
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private errorHandler: ErrorHandlerService ,
    private confirmDialogService: ConfirmDialogService,
    private jobService: JobService,
    private countryService: CountryService,
    private authService: AuthService

  ) {
    this.searchForm = this.fb.group({
      companyId: [null],
      contractType: [null],
      experience: [null],
      description: [null],
      jobType: [null],
      languages: this.fb.array([]),
      levelOfEducation: [null],
      salary: [null],
      skills: this.fb.array([]),
      title: [null],
      city: [null],
      country: [null],
    });
  
   }
   ngOnInit() {
    this.onSearch();
    this.companyService.getAllCompaniesAsList().subscribe((companyList) => {
      this.companies = companyList;
    });

    this.countryService.getCountriesList().subscribe((countryList) => {
      this.countries = countryList;
    });

    
   }

   mayPostJob() {
    return this.authService.getUserRole() === 'ROLE_ADMIN' || this.authService.getUserRole() === 'ROLE_COMPANY';
   }
   isAdmin() {
    return this.authService.getUserRole() === 'ROLE_ADMIN';
   }

   get companyId() : FormControl {
    return this.searchForm.get('companyId') as FormControl;
   }
   get languages(): FormArray {
    return this.searchForm.get('languages') as FormArray;
  }

  get skills(): FormArray {
    return this.searchForm.get('skills') as FormArray;
  }

  addLanguage(): void {
    this.languages.push(new FormControl(null));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  addSkill(): void {
    this.skills.push(new FormControl(null));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
   onSearch(): void {
    const criteria = this.searchForm.value;
    const pageable = {
      page: this.page,
      size: this.size
    };
  
    const params: GetAllJobs$Params = {

  
        body: criteria,
      
      
    };
  
    this.jobService.getAllJobs({body: params.body, page: pageable.page, size:pageable.size}).subscribe(
      (response) => {
        this.jobs = response.content || [];
        this.totalElements = response.totalElements || 0;
      },
      (error) => {
        console.error('Error fetching jobs', error);
      }
    )
   
  }
  resetFilter() {
    this.searchForm.reset();
    this.page = 0;
    this.onSearch();
  }

  onPageChange(page: number): void {
    this.page = page - 1;
    this.onSearch();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalElements / this.size);
  }
  
  setPage(page: number): void {
    if (page >= 0 && page < Math.ceil(this.totalElements / this.size)) {
      this.page = page;
      this.onSearch();
    }
  }

  setPageSize(event: Event): void {
    const pageSize = +(event.target as HTMLSelectElement).value;
    this.size = pageSize;
    this.page = 0;
    this.onSearch();
  }

  getLogoUrl(id: string): string {
    let company ;
     this.companyService.getCompanyById({id}).subscribe(companyDto => {
      company = companyDto;
     });
    if (company!.logo && company!.logo.data) {
      const base64String = Array.isArray(company!.logo.data) ? company!.logo.data.join('') : company!.logo.data;
      return `data:${company!.logo.fileType};base64,${base64String}`;
    }
    return '';
  }



}
