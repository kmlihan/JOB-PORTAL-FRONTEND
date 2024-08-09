import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-card-component',
  templateUrl: './job-card-component.component.html',
  styleUrl: './job-card-component.component.scss'
})
export class JobCardComponentComponent {

  @Input() jobTitle!: string;
  @Input() companyName!: string;
  @Input() location!: string;
  @Input() imageUrl!: string;
}
