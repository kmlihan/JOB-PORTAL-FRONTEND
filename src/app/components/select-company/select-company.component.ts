import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CompanyDto, AttachmentDto } from '../../modules/api-module/models';
import { CompanyService } from '../../modules/api-module/services';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrl: './select-company.component.scss'
})
export class SelectCompanyComponent {
  @Input() companyId!: FormControl ;
  @Output() companySelected = new EventEmitter<CompanyDto>();
  @Input()  isDropdownDisabled!: boolean ; 
  companies: CompanyDto[] = [];
  filteredCompanies: CompanyDto[] = [];
  dropdownOpen: boolean = false;
  selectedCompanyName: string | null = null;
  selectedCompanyLogo: string | null = null;
  loading: boolean = false;
  page: number = 0;
  pageSize: number = 20;
  companyData!: CompanyDto ;
  searchCompanyControl = new FormControl();
  edit: boolean = true;
 

  constructor(
    private companyService: CompanyService,
    private elementRef: ElementRef,
    private renderer: Renderer2) {}

  ngOnInit(): void {

    this.loadCompanies();
    this.searchCompanyControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => this.filterCompanies(value));

    this.companyId.valueChanges.subscribe(value => {
      if(this.edit) {
      this.setSelectedCompany(value);
      this.edit = false;
      this.isDropdownDisabled = true;
      }
    } );

   


    this.renderer.listen('document', 'click', (event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.dropdownOpen = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyId'] && this.companyId.value) {
      this.setSelectedCompany(this.companyId.value);
    }
  }

  setSelectedCompany(companyId: string): void {
    const company = this.companies.find(c => c.id === companyId);
    if (company) {
      this.selectCompany(company);
    } else {

      this.companyService.getCompanyById({ id: companyId }).subscribe(company => {
        if (company) {
          this.selectCompany(company);
        }
      });
    }
  }



  

  onSearchFocus(): void {
    if (this.companies.length === 0) {
      this.loadCompanies();
    } else {
      this.filteredCompanies = this.companies.slice(0, this.pageSize);
    }
    this.dropdownOpen = true;
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
      
    }
  }

  onScroll(event: any): void {
    const threshold = 150;
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

  selectCompany(company: CompanyDto): void {
    this.companyId.patchValue(company.id);
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
}
