import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../error-handler.service';
import { CompanyService } from '../../modules/api-module/services';
import { GetAllCompanies$Params } from '../../modules/api-module/fn/company-service/get-all-companies';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { AttachmentDto, CompanyDto, Page } from '../../modules/api-module/models';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

  searchForm: FormGroup;

  companies: any[] = [];
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
    private confirmDialogService: ConfirmDialogService

  ) {
    this.searchForm = this.fb.group({
      name: [null],
      description: [null],
      email: [null],
      websiteUrl: [null],
      city: [null],
      country: [null],
    });
  
   }

   ngOnInit() {
    this.onSearch();
   }

   onSearch(): void {
    const criteria = this.searchForm.value;
    const pageable = {
      page: this.page,
      size: this.size
    };
  
    const params: GetAllCompanies$Params = {

  
        body: criteria,
        pageable: pageable
      
    };
  
    this.companyService.getAllCompanies(params).subscribe(
      (data) => {
        this.companies = data.content || []; 
        this.totalElements = data.totalElements || 0; 
      },
      (error) => {
        console.error('Error fetching companies', error);
      }
    );
  }

  resetFilter() {
    this.searchForm.reset();
    this.page = 0;
    this.onSearch();
  }
  






  deleteCompany(userId: string): void {
    this.confirmDialogService.confirm('Confirm Delete', 'Are you sure you want to delete this company?').subscribe(result => {
      if (result) {
        this.companyService.deleteCompany({ id: userId }).subscribe(
          (response) => {
            this.onSearch();
          },
          (error) => {
            console.error('Error deleting user', error);
          }
        );
      }
    });
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

  getLogoUrl(logo: AttachmentDto): string {
    if (logo && logo.data) {
      const base64String = Array.isArray(logo.data) ? logo.data.join('') : logo.data;
      return `data:${logo.fileType};base64,${base64String}`;
    }
    return '';
  }
}
