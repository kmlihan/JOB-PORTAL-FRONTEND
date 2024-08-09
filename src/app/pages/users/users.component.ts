import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../modules/api-module/services';
import { ConfirmDialogService } from '../../confirm-dialog.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchForm: FormGroup;
  users: any[] = [];
  totalElements: number = 0;
  page: number = 0;
  size: number = 10;  
  sort: string = 'lastModifiedDate,desc';
  pageSizes: number[] = [5, 10, 25, 50];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.searchForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      phone: [null],
      birthDate: [null],
      nationality: [null],
      profileTitle: [null],
      skills: [null],
      languages: [null],
      archived: [null],
      city: [null],
      country: [null],
    });
  }

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    const criteria = this.searchForm.value;
    const pageable = {
      page: this.page,
      size: this.size,
    };
    this.userService.getAllUsers({ pageable: pageable, body: criteria }).subscribe(
      (data) => {
        this.users = data.content!;
        this.totalElements = data.totalElements!;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  resetFilter() {
    this.searchForm.reset();
    this.page = 0;
    this.onSearch();
  }

  deleteUser(userId: string): void {
    this.confirmDialogService.confirm('Confirm Delete', 'Are you sure you want to delete this user?').subscribe(result => {
      if (result) {
        this.userService.deleteUser({ id: userId }).subscribe(
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
}
