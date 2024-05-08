import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css',
})
export class InterviewComponent {
  constructor(private http: HttpClient) {}
  searchText = '';
  // characters = [
  //   'Ant-Man',
  //   'Aquaman',
  //   'Asterix',
  //   'The Atom',
  //   'The Avengers',
  //   'Batgirl',
  //   'Batman',
  //   'Batwoman',
  // ];
  employee: any[] = [];
  filteredEmployees: string[] = [];

  ngOnInit() {
    // Initially, display all characters
    this.fetchEmployee();
  }

  fetchEmployee() {
    // Make an API call to fetch all characters
    this.http
      .get<any>(environment.baseURL + 'EmployeeAccount/getAllEmployees')
      .subscribe(
        (data) => {
          console.log(data);
          this.employee = data; // Assuming API returns an array of objects
          // this.filterItems(); // Apply initial filtering
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
  }

  filterItems() {
    // If search text is empty, display all characters
    if (!this.searchText.trim()) {
      this.filteredEmployees = this.employee.slice();
      return;
    }

    // Filter characters based on search text
    this.filteredEmployees = this.employee.filter((item) =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
