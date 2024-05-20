import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { JobCategoryResponse } from '../../Models/JobCategoryResponse/JobCategoryResponse';
import { JobCategory } from '../../Models/JobCategoryResponse/JobCategory';
import { JobPositionResponse } from '../../Models/JobPositionResponse/JobPositionResponse';
import { position } from '../../Models/JobPositionResponse/position';
import { location } from '../../Models/JoblocationResponse/location';
import { JobLocationResponse } from '../../Models/JoblocationResponse/JobLocationResponse';
import { JobType } from '../../Models/JobTypeResponse/JobType';
import { JobTypeResponse } from '../../Models/JobTypeResponse/JobTypeResponse';
import { Degree } from '../../Models/DegreeResponse/Degree';
import { DegreeResponse } from '../../Models/DegreeResponse/DegreeRespose';
import { EducationInstitution } from '../../Models/EducationInstitutionResponse/EducationInstitution';
import { EducationInstitutionResponse } from '../../Models/EducationInstitutionResponse/EducationInstitutionResponse';

@Injectable({
  providedIn: 'root'
})
export class CrudJobDataService {

  constructor(private http: HttpClient) { }

  addCategory(addCategoryForm: JobCategory){
    return this.http.post<JobCategoryResponse>(
      environment.baseURL + 'JobCategory/AddJobCategory',addCategoryForm );
  }

  addPosition(addPositionForm: position){
    return this.http.post<JobPositionResponse>(
      environment.baseURL + 'JobPosition/AddJobPosition',addPositionForm);
  }

  addLocation(addLocationForm: location){
    return this.http.post<JobLocationResponse>(
      environment.baseURL + 'JobLocation/AddJobLocation',addLocationForm);
  }

  addTypes(addTypesForm: JobType){
    return this.http.post<JobTypeResponse>(
      environment.baseURL + 'JobType/AddJobType',addTypesForm);
  }

  addDegree(addDegreeForm: Degree){
    return this.http.post<DegreeResponse>(
      environment.baseURL + 'Degree/addDegree',addDegreeForm)
  }

  addInstitution(addInstitutionForm: EducationInstitution){
    return this.http.post<EducationInstitutionResponse>(
      environment.baseURL + 'EducationInstitution/addInstitution',addInstitutionForm)
  }

  deleteCategoryByCategoryId(categoryId: string){
    return this.http.delete(
      environment.baseURL + 'JobCategory/DeleteJobCategory/' + categoryId
    );
  }

  deletePositionByPositionId(positionId: string){
    return this.http.delete(
      environment.baseURL + 'JobPosition/DeleteJobPosition/' + positionId);
  }

  deleteLocationByLocationId(locationId: string){
    return this.http.delete(
      environment.baseURL + 'JobLocation/DeleteLocation/' + locationId
    );
  }

  deleteTypeByTypeId(typeId: string){
    return this.http.delete(
      environment.baseURL + 'JobType/DeleteJobType/' + typeId
    );
  }

  deleteDegreeByDegreeId(degreeId: string){
    return this.http.delete(
      environment.baseURL + 'Degree/removeDegree/' + degreeId
    );
  }

  deleteInstitutionByInstitutionId(institutionId: string){
    return this.http.delete(
      environment.baseURL + 'EducationInstitution/removeInstitution/' + institutionId
    );
  }

  deleteCompanyByCompanyId(companyId?: string){
    return this.http.delete(environment.baseURL+ 'Company/removeCompany/' + companyId);
  }

  updateDegreeByDegreeId(updatedDegree: Degree){
    return this.http.put(
      environment.baseURL + 'Degree/updateDegree/', updatedDegree
    );
  }

}
