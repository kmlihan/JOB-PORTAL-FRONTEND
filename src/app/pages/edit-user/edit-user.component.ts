import { Component, Input } from '@angular/core';
import { AuthService, JobService, UserService } from '../../modules/api-module/services';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistrationSuccessDialogComponent } from '../../components/registration-success-dialog/registration-success-dialog.component';
import { ErrorHandlerService } from '../../error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '../../confirm-dialog.service';
import { SuccessDialogService } from '../../success-dialog.service';
import { AttachmentDto, JobDto, UserDto } from '../../modules/api-module/models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  userId: string = '';
  profilePicture: File | null = null;
  cvFile: File | null = null;
  cvPreviewUrl: string  = '';
  profilePicturePreviewUrl: string  = '';
  editUserForm: FormGroup;
  viewMode : 'edit' | 'view' = 'view';
  user!: UserDto;
  jobs!: JobDto[];

  constructor( 
    private userService : UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService ,
    private dialog: MatDialog,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private successDialogService: SuccessDialogService,
    private authService: AuthService,
    private jobService: JobService
  ) {
    this.editUserForm = this.fb.group({
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

   ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    this.userService.getAppliedJobsForUser({ userId: this.userId}).subscribe(response => {
      this.jobs = response;

    });
    this.userService.getUserById({ id: this.userId }).subscribe(user => {
      this.user = user;
      this.patchFormValues(user);
      this.editUserForm.markAsUntouched(); 
      this.editUserForm.disable();
  
      if (user.cv && user.cv.data) {
       
      
          this.cvPreviewUrl = this.getFileUrl(user.cv);
        
      } else {
        console.warn('user.cv or user.cv.data is not defined');
      }
  
      if (user.profilePicture && user.profilePicture.data) {
      
     
          this.profilePicturePreviewUrl = this.getFileUrl(user.profilePicture);
        
      } else {
        console.warn('user.profilePicture or user.profilePicture.data is not defined');
      }
    });
  }
  

  
  getFileUrl(logo: AttachmentDto): string {
    if (logo && logo.data) {
      const base64String = Array.isArray(logo.data) ? logo.data.join('') : logo.data;
      return `data:${logo.fileType};base64,${base64String}`;
    }
    return '';
  }
  

    mayEdit() {
      return this.authService.getUserRole() === 'ROLE_ADMIN' 
      || this.authService.getUserRole() === 'ROLE_USER' 
      && this.authService.getUserId() === this.userId;
    }


   patchFormValues(user: any) {
    if (user) {
      Object.keys(user).forEach(key => {
        if (this.editUserForm.controls[key]) {
          const control = this.editUserForm.get(key);
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
  
     // Get user fields
  get firstName() { return this.editUserForm.get('firstName')!; }
  get lastName() { return this.editUserForm.get('lastName')!; }
  get email() { return this.editUserForm.get('email')!; }
  get password() { return this.editUserForm.get('password')!; }
  get phone() { return this.editUserForm.get('phone')!; }
  get birthDate() { return this.editUserForm.get('birthDate')!; }
  get nationality() { return this.editUserForm.get('nationality')!; }
  get profileTitle() { return this.editUserForm.get('profileTitle')!; }
  get address() { return this.editUserForm.get('address') as FormGroup; }
  get bio() { return this.editUserForm.get('bio')!; }
  get githubUrl() { return this.editUserForm.get('githubUrl')!; }
  get linkedinUrl() { return this.editUserForm.get('linkedinUrl')!; }
  get skills() { return this.editUserForm.get('skills') as FormArray; }
  get languages() { return this.editUserForm.get('languages') as FormArray; }
  get qualifications() { return this.editUserForm.get('qualifications') as FormArray; }
  get experiences() { return this.editUserForm.get('experiences') as FormArray; }


  onFileChange(event: any, type: 'cv' | 'profilePicture' | 'logo'): void {
    const file = event.target.files[0];
    if (file) {

  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'cv') {
          const fileUrl = URL.createObjectURL(file);
          this.cvPreviewUrl = fileUrl;
          this.cvFile = file;
        } else if (type === 'profilePicture') {
          const fileUrl = URL.createObjectURL(file);
          this.profilePicturePreviewUrl = fileUrl;
          this.profilePicture = file;
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.warn(`No file selected for ${type}`);
    }
  }

  enableForm() {
    this.editUserForm.enable();
  }

  viewForm() {
    this.editUserForm.markAsUntouched(); 
    this.ngOnInit();
  }
 
  disableAllControls(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.disable();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.disableAllControls(control);
      }
    });
  }


  deleteUser(): void {
    this.confirmDialogService.confirm('Confirm Delete', 'Are you sure you want to delete this user?').subscribe(result => {
      if (result) {
        this.userService.deleteUser({ id: this.userId }).subscribe(
          (response) => {
           
            this.router.navigate(['/users']);
          },
          (error) => {
            console.error('Error deleting user', error);
          }
        );
      }
    });
  }


  removeCv() {
    this.cvFile = null;
    this.cvPreviewUrl = '';
  }
  
  removeProfilePicture() {
    this.profilePicture = null;
    this.profilePicturePreviewUrl = '';
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

  onSubmit(): void {
    
      if (this.editUserForm.valid) {

        this.removeNullValues(this.skills);
        this.removeNullValues(this.languages);
        this.userService.updateUser({id:this.userId, body: this.editUserForm.value })
          .subscribe(response => {
           
          
            this.uploadProfilePicture(this.userId);
            this.openSuccessDialog();
          },
          (error: HttpErrorResponse) => {
            console.error('Registration failed', error);
            this.handleError(error);
            
          });
  
      } else {
        this.editUserForm.markAllAsTouched();
        
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
      'Update Successful',
      'User successfully updated'
    ).subscribe(() => {
      this.ngOnInit();
    });
  }

  uploadProfilePicture(userId: string): void {
    if (this.profilePicture) {
      this.userService.uploadProfilePicture({userId:userId, body: {file: this.profilePicture}})
        .subscribe(response => {
          
          this.uploadCv(userId);
        },
        error => {
          console.error('Error uploading profile picture', error);
          this.uploadCv(userId);  // Ensure CV upload is called even if profile picture upload fails
        });
    } else {
      console.warn('No profile picture to upload');
      this.uploadCv(userId);
    }
  }
  
  uploadCv(userId: string): void {
    if (this.cvFile) {
      this.userService.uploadCv({userId: userId, body: {file: this.cvFile}})
        .subscribe(response => {
        },
        error => {
          console.error('Error uploading CV', error);
        });
    } else {
      console.warn('No CV to upload');
    }
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
}
