import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CompanyService, CountryService, UserService } from '../../modules/api-module/services';
import { CompanyDto, ExperienceDto, QualificationDto, UserDto } from '../../modules/api-module/models';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../../components/registration-success-dialog/registration-success-dialog.component';
import { ErrorHandlerService } from '../../error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { UploadProfilePicture$Params } from '../../modules/api-module/fn/user-service/upload-profile-picture';
import { UploadCv$Params } from '../../modules/api-module/fn/user-service/upload-cv';
import { SuccessDialogService } from '../../success-dialog.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  createUserForm: FormGroup;
  createCompanyForm: FormGroup;
  profilePicture: File | null = null;
  cvFile: File | null = null;
  logo: File | null = null;
  userType: string = 'USER';
  selectedFile: any;
  filePreview: string | ArrayBuffer | null = null;
  logoError: boolean = false;
  errorMessage: string = '';
  cvPreviewUrl: string  = '';
  profilePicturePreviewUrl: string  = '';
  logoPreviewUrl: string = '';
  
  
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService ,
    private cdRef: ChangeDetectorRef,
    private userService: UserService,
    private companyService: CompanyService,
    private successDialogService: SuccessDialogService
  ) {



    this.createCompanyForm = this.fb.group({
      name: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.compose([Validators.required])),
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


    this.createUserForm = this.fb.group({
      firstName: new FormControl(null, Validators.compose([Validators.required])),
      lastName: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.compose([Validators.required])),
      phone: new FormControl(null, Validators.compose([Validators.required])),
      birthDate: new FormControl(null, Validators.compose([Validators.required, this.ageValidator(18)])),
      nationality: new FormControl(null, Validators.compose([Validators.required])),
      profileTitle: new FormControl(null, Validators.compose([Validators.required])),
      address: new FormGroup({
      city: new FormControl(null, Validators.compose([Validators.required])),
      postalCode: new FormControl(null, Validators.compose([Validators.required])),
      street: new FormControl(null, Validators.compose([Validators.required])),
      houseNumber: new FormControl(null, Validators.compose([Validators.required])),
      box: new FormControl(null),
      country: new FormControl(null, Validators.compose([Validators.required])),
      }),
      bio: new FormControl(null, Validators.compose([Validators.required])),
      githubUrl: new FormControl(null),
      linkedinUrl: new FormControl(null),
      skills: new FormArray([]),
      languages: new FormArray([]),
      qualifications: new FormArray([]),
      experiences: new FormArray([]),
    });

  }

  ngOnInit(): void {
  
  }

  // Get user fields
  get firstName() { return this.createUserForm.get('firstName')!; }
  get lastName() { return this.createUserForm.get('lastName')!; }
  get email() { return this.createUserForm.get('email')!; }
  get password() { return this.createUserForm.get('password')!; }
  get phone() { return this.createUserForm.get('phone')!; }
  get birthDate() { return this.createUserForm.get('birthDate')!; }
  get nationality() { return this.createUserForm.get('nationality')!; }
  get profileTitle() { return this.createUserForm.get('profileTitle')!; }
  get address() { return this.createUserForm.get('address') as FormGroup; }
  get bio() { return this.createUserForm.get('bio')!; }
  get githubUrl() { return this.createUserForm.get('githubUrl')!; }
  get linkedinUrl() { return this.createUserForm.get('linkedinUrl')!; }
  get skills() { return this.createUserForm.get('skills') as FormArray; }
  get languages() { return this.createUserForm.get('languages') as FormArray; }
  get qualifications() { return this.createUserForm.get('qualifications') as FormArray; }
  get experiences() { return this.createUserForm.get('experiences') as FormArray; }



  // Get company fields
  get name() { return this.createCompanyForm.get('name')!; }
  get description() { return this.createCompanyForm.get('description')!; }
  get websiteUrl() { return this.createCompanyForm.get('websiteUrl')!; }
  get emailCompany() { return this.createCompanyForm.get('email')!; }
  get passwordCompany() {return this.createCompanyForm.get('password')!;}
  get addressCompany() {return this.createCompanyForm.get('address') as FormGroup; }




  logFormStatus(): void {
    this.logFormControlsStatus(this.createUserForm);
  }

  logFormControlsStatus(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.logFormControlsStatus(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(ctrl => this.logFormControlsStatus(ctrl as FormGroup));
      } else {
      }
    });
  }






  onSubmit(): void {
    if(this.userType === 'USER') {
      if (this.createUserForm.valid) {

        this.removeNullValues(this.skills);
        this.removeNullValues(this.languages);
        this.authService.registerUser({ body: this.createUserForm.value })
          .subscribe(response => {

            

            const userId = response.id;

  
            this.uploadProfilePicture(userId!);
            this.openSuccessDialog();
          },
          (error: HttpErrorResponse) => {
            console.error('Registration failed', error);
            this.handleError(error);
            
          });
  
      } else {
        this.createUserForm.markAllAsTouched();
        
      }
  } else {
      if (this.createCompanyForm.valid) {
        const company: CompanyDto = this.createCompanyForm.value;
       
  
        const params = {
          body: company
        };
  
        this.authService.registerCompany(params as any).subscribe(
          response => {
            this.uploadLogo(response.id!);
            this.openSuccessDialog();
          },
          error => {
            console.error('Error registering company', error);
            this.handleError(error);
          }
        );
      } else {
        this.createCompanyForm.markAllAsTouched();
      }
    }
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

  uploadProfilePicture(userId: string): void {
    if (this.profilePicture) {
     

      this.userService.uploadProfilePicture({userId: userId, body : {file: this.profilePicture}})
        .subscribe(response => {

          this.uploadCv(userId);

        },
        error => {
          console.error('Error uploading profile picture', error);
        
        });
    } else {
      console.warn('No profile picture to upload');
      this.uploadCv(userId);
    }
  }

  uploadCv(userId: string): void {
    if (this.cvFile) {
     

      this.userService.uploadCv$Response({userId: userId, body: {file: this.cvFile}})
        .subscribe(response => {
         
        },
        error => {
          console.error('Error uploading CV', error);
          
        });
    } else {
      console.warn('No CV to upload');
      
    }
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

  private  async getServerErrorMessage(error: HttpErrorResponse): Promise<string> {
    try {
      const errorData = error.error instanceof Blob
        ? JSON.parse( await error.error.text())
        : error.error;
      return errorData.message || `Error: ${error.message}`;
    } catch (e) {
      return `Error: ${error.message}`;
    }
  }


  openSuccessDialog(): void {
    this.successDialogService.showSuccess(
      'Registration Successful',
      'Your registration was successful. You will be redirected to the login page.'
    ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
  addSkill(): void {
    this.skills.push(new FormControl(null));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  addLanguage(): void {
    this.languages.push(new FormControl(null));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }



  removeDuplicatesAfterDelay(formArray: FormArray): void {
    setTimeout(() => {
      this.removeDuplicates(formArray);
    }, 2000); 
  }

  removeDuplicates(formArray: FormArray): void {
    const uniqueValues: Set<string> = new Set();
    const toRemove: number[] = [];

    formArray.controls.forEach((control, index) => {
      const value = control.value.toLowerCase().trim();
      if (uniqueValues.has(value) || value === '') {
        toRemove.push(index);
      } else {
        uniqueValues.add(value);
      }
    });
    for (let i = toRemove.length - 1; i >= 0; i--) {
      formArray.removeAt(toRemove[i]);
    }
  }
  




 
  removeLogo(): void {
    this.logoPreviewUrl = '';
    this.logo = null;
  }


  onFileChange(event: any, type: 'cv' | 'profilePicture' | 'logo'): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      

      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'cv') {
          const fileUrl = URL.createObjectURL(file);
          this.cvPreviewUrl = fileUrl;
          this.cvFile = file;
        } else if (type === 'profilePicture') {
          const fileUrl = URL.createObjectURL(file);
          this.profilePicturePreviewUrl = fileUrl;
          this.profilePicture  = file;
        } else {
          const fileUrl = URL.createObjectURL(file);
          this.logoPreviewUrl = fileUrl;
          this.logo = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  

    ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
  
      if (
        age < minAge ||
        (age === minAge && monthDiff < 0) ||
        (age === minAge && monthDiff === 0 && dayDiff < 0)
      ) {
        return { 'tooYoung': { value: control.value } };
      }
      return null;
    };
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

  removeCv() {
    this.cvFile = null;
    this.cvPreviewUrl = '';
  }
  
  removeProfilePicture() {
    this.profilePicture = null;
    this.profilePicturePreviewUrl = '';
  }



}
