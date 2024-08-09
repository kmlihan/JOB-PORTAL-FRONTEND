import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  feedbacks = [
    { name: 'John Doe', message: 'This job portal is fantastic! It helped me find my dream job quickly and easily.', image: 'https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=1294&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Jane Smith', message: 'I love the user-friendly interface and the comprehensive job listings available.' },
    { name: 'Samuel Lee', message: 'The career resources provided here are incredibly useful. Highly recommended!' }
  ];
}
