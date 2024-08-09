import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '../../modules/api-module/services';
import { SuccessDialogService } from '../../success-dialog.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private contactService: ContactService,  private successDialogService: SuccessDialogService,) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      this.contactService.handleContact({body: contactData}).subscribe(contact => {
       this.openSuccessDialog();
        this.contactForm.reset();
      },
      error => {
        console.error('Error:', error);
        this.message = 'There was an error sending your message. Please try again later.';
      });
     
    } else {
      this.message = 'Please fill out the form correctly.';
    }
  }

  openSuccessDialog(): void {
    this.successDialogService.showSuccess(
      'Message send',
      'Your message has been sent!'
    ).subscribe(() => {
     
    });
  }
}
