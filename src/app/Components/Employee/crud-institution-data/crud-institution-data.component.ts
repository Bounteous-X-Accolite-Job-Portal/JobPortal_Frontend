import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crud-institution-data',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './crud-institution-data.component.html',
  styleUrl: './crud-institution-data.component.css'
})
export class CrudInstitutionDataComponent {

}
