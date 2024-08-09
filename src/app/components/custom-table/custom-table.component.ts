import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages: number | undefined;
  paginatedData: any[] | undefined;
  headerKeys: string[] = [];

  constructor() {}

  ngOnInit() {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.initializeTable();
    }
  }

  initializeTable() {
    this.headerKeys = this.headers.map(header => header.toLowerCase());
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    this.paginate();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages!) {
      this.currentPage++;
      this.paginate();
    }
  }
}
