import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CompanyService } from '../../modules/api-module/services';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogService } from '../../success-dialog.service';
import { AttachmentDto, JobDto } from '../../modules/api-module/models';
import { ConfirmDialogService } from '../../confirm-dialog.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrl: './edit-company.component.scss'
})
export class EditCompanyComponent {


  logo: File | null = null;
  logoPreviewUrl: string = '';
  editCompanyForm!: FormGroup;
  companyId!: string ;
  jobs: JobDto[] = [];

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private router: Router,
    private successDialogService: SuccessDialogService,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,

  ) {
    this.editCompanyForm = this.fb.group({
      name: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      description: new FormControl(null, Validators.compose([Validators.required])),
      websiteUrl: new FormControl(null),
      address: new FormGroup({
        city: new FormControl(null, Validators.compose([Validators.required])),
        postalCode: new FormControl(null, Validators.compose([Validators.required])),
        street: new FormControl(null, Validators.compose([Validators.required])),
        houseNumber: new FormControl(null, Validators.compose([Validators.required])),
        box: new FormControl(null),
        country: new FormControl(null, Validators.compose([Validators.required])),
        })
    });
   }

    ngOnInit() {
      this.companyId = this.route.snapshot.paramMap.get('id') || '';
      this.companyService.getAllJobsForCompany({companyId: this.companyId}).subscribe(data => {
        this.jobs = data;
      });
      this.companyService.getCompanyById({id: this.companyId}).subscribe((company) => {
        this.patchFormValues(company);
        this.editCompanyForm.markAsUntouched(); 
        this.editCompanyForm.disable();
        this.logoPreviewUrl = this.getLogoUrl(company.logo!);;
      })
    }

    // Get company fields
    get name() { return this.editCompanyForm.get('name')!; }
    get description() { return this.editCompanyForm.get('description')!; }
    get websiteUrl() { return this.editCompanyForm.get('websiteUrl')!; }
    get emailCompany() { return this.editCompanyForm.get('email')!; }
    get addressCompany() {return this.editCompanyForm.get('address') as FormGroup; }
  
    onSubmit() {
     if (this.editCompanyForm.valid) {
      this.companyService.updateCompany({id: this.companyId, body: this.editCompanyForm.value}).subscribe(data => {
        this.uploadLogo(this.companyId);
        this.openSuccessDialog();
      });
     }
      }
    patchFormValues(user: any) {
      if (user) {
        Object.keys(user).forEach(key => {
          if (this.editCompanyForm.controls[key]) {
            const control = this.editCompanyForm.get(key);
            if (control instanceof FormControl && user[key] !== null) {
              control.patchValue(user[key]);
            } else if (control instanceof FormGroup && user[key] !== null) {
              this.patchFormGroup(control, user[key]);
            } else if (control instanceof FormArray && user[key] !== null && Array.isArray(user[key])) {
              this.patchFormArray(control, user[key]);
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

  uploadLogo(companyId: string) {
    if (this.logo) {
      this.companyService.uploadLogo({companyId: companyId, body: { logo :this.logo}})
        .subscribe(response => {
        },
        error => {
          console.error('Error uploading logo', error);
        
        });
    } else {
      console.warn('No logo to upload');
    }
  }

  onFileChange(event: any, type:  'logo'): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
       
          const fileUrl = URL.createObjectURL(file);
          this.logoPreviewUrl = fileUrl;
          this.logo = file;
        
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo(): void {
    this.logoPreviewUrl = '';
    this.logo = null;
  }

  openSuccessDialog(): void {
    this.successDialogService.showSuccess(
      'Update Successful',
      'Company successfully updated'
    ).subscribe(() => {
      this.ngOnInit();
    });
  }
  
  getLogoUrl(logo: AttachmentDto): string {
    if (logo && logo.data) {
      const base64String = Array.isArray(logo.data) ? logo.data.join('') : logo.data;
      return `data:${logo.fileType};base64,${base64String}`;
    }
    return '';
  }

  enableForm() {
    this.editCompanyForm.enable();
  }

  viewForm() {
    this.editCompanyForm.markAsUntouched(); 
    this.ngOnInit();
  }
  deleteCompany(): void {
    this.confirmDialogService.confirm('Confirm Delete', 'Are you sure you want to delete this company?').subscribe(result => {
      if (result) {
        this.companyService.deleteCompany({ id: this.companyId }).subscribe(
          (response) => {
           
            this.router.navigate(['/companies']);
          },
          (error) => {
            console.error('Error deleting user', error);
          }
        );
      }
    });
  }

  logFormErrors(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.get(key);
      if (control instanceof FormControl) {
        if (control.invalid) {
        }
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.logFormErrors(control);
      }
    });
  }
  
}
