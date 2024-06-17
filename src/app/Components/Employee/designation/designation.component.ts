import { Component, OnInit, inject } from '@angular/core';
import { DesignationService } from '../../../Services/Designation/designation.service';
import { SpinnerService } from '../../../Services/spinner.service';
import { CommonModule } from '@angular/common';
import { DesignationResponse } from '../../../Models/DesignationResponse/DesignationResponse';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { DesignationWithPrivilegeService } from '../../../Services/DesignationWithPrivilege/designation-with-privilege.service';
import { DesignationAndPrivilege } from '../../../Models/DesignationResponse/DesignationAndPrivilege';
import { DesignationWithPrivilegeResponse } from '../../../Models/DesignationWithPrivilegeResponse/DesignationWithPrivilegeResponse';
import { DesignationWithPrivilege } from '../../../Models/DesignationWithPrivilegeResponse/DesignationWithPrivilege';
import { UserStoreService } from '../../../Services/user-store.service';
import { AuthService } from '../../../Services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastrModule],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit {
  toaster = inject(ToastrService);

  hasSpecialPrivilege: boolean = false;

  allDesignations: DesignationAndPrivilege[] = [];

  form!: FormGroup;
  submitting = false;

  constructor(
    private designationService: DesignationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private designationWithPrivilege: DesignationWithPrivilegeService,
    private userStore: UserStoreService,
    private authService: AuthService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.checkHasSpecialPrivilege();
    this.loadDesignationAndPrivileges();

    this.form = this.formBuilder.group({
      newDesignation: ['', [Validators.required]],
    });

    this.breakpointObserver
      .observe(['(max-width: 481px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          document.getElementById("AddModal")?.classList.add("modal-dialog-centered");
        }
      });
  }

  get f() {
    return this.form.controls;
  }

  checkHasSpecialPrivilege() {
    this.spinnerService.showSpinner();

    this.userStore.checkHasSpecialPrivilegeFromStore().subscribe((val) => {
      let specialPrivilege =
        this.authService.checkHasSpecialPrivilegeFromToken();
      this.hasSpecialPrivilege = val || specialPrivilege;
    });

    this.spinnerService.hideSpinner();

    // console.log("hasSpecialPrivilege at emp dash", this.hasSpecialPrivilege);
  }

  loadDesignationAndPrivileges() {
    this.spinnerService.showSpinner();

    forkJoin({
      designations: this.designationService.getAllDesignations(),
      privileges:
        this.designationWithPrivilege.getAllDesignationWithPrivilege(),
    }).subscribe(
      (result) => {
        // console.log("all designation with privilege", result);

        let map = new Map();
        if (result.privileges.allPrivileges !== null) {
          result.privileges.allPrivileges.forEach((element) => {
            map.set(element.designationId, element);
          });
        }

        if (result.designations.allDesignations !== null) {
          result.designations.allDesignations.forEach((element) => {
            let designation: DesignationAndPrivilege = {
              designation: element,
              privilege: map.has(element.designationId)
                ? map.get(element.designationId)
                : null,
            };

            this.allDesignations.push(designation);
          });
        }

        this.spinnerService.hideSpinner();
      },
      (error) => {
        console.log(error);
        this.spinnerService.hideSpinner();
      }
    );
  }

  clickOnAddDesignationButton() {
    this.spinnerService.showSpinner();
    this.form.reset();
    this.spinnerService.hideSpinner();
  }

  addDesignation() {
    this.spinnerService.showSpinner();

    let newDes: string = this.form.value.newDesignation;
    // console.log("new designation", newDes);

    this.designationService.addDesignation(newDes).subscribe(
      (res: DesignationResponse) => {
        // console.log("added designation", res);

        this.designationWithPrivilege
          .getPrivilegeByDesignationId(res.designation.designationId)
          .subscribe(
            (privilegeRes: DesignationWithPrivilegeResponse) => {
              // console.log("privilege in add designation", privilegeRes);

              let designation: DesignationAndPrivilege = {
                designation: res.designation,
                privilege:
                  privilegeRes.designationWithPrivilege != null
                    ? privilegeRes.designationWithPrivilege
                    : undefined,
              };
              this.allDesignations.push(designation);

              this.toaster.success('Successfully added new designation !');
              this.spinnerService.hideSpinner();

              document.getElementById('closeButton')?.click();
            },
            (error) => {
              // console.log(error);
              this.toaster.error(error.message);
              this.spinnerService.hideSpinner();
            }
          );
      },
      (error) => {
        // console.log(error);
        this.toaster.error(error.message);
        this.spinnerService.hideSpinner();
      }
    );
  }

  deleteDesignation(id: number) {
    if (confirm('Are you sure you want to delete this designation ?')) {
      this.spinnerService.showSpinner();

      this.designationService.deleteDesignation(id).subscribe(
        (res: DesignationResponse) => {
          // console.log("deleted designation", res);

          this.allDesignations = this.removeDesignationFromAllDesignations(
            this.allDesignations,
            res
          );

          this.toaster.success(
            'Successfully deleted designation - ' +
              res.designation.designationName +
              ' !'
          );
          this.spinnerService.hideSpinner();
        },
        (error) => {
          // console.log(error);
          this.spinnerService.hideSpinner();
          this.toaster.error('Error :', error);
        }
      );
    }
  }

  removeDesignationFromAllDesignations(
    allDesignations: DesignationAndPrivilege[],
    toBeRemoved: DesignationResponse
  ) {
    let newArray: DesignationAndPrivilege[] = [];

    for (let i = 0; i < allDesignations.length; i++) {
      if (
        allDesignations[i].designation.designationId !==
        toBeRemoved.designation.designationId
      ) {
        newArray.push(allDesignations[i]);
      }
    }

    return newArray;
  }

  providePrivilege(designationId: number) {
    this.spinnerService.showSpinner();

    this.designationWithPrivilege.addPrivilege(designationId).subscribe(
      (result) => {
        // console.log("add privilege", result);

        this.addPrivilegeToDesignation(
          this.allDesignations,
          designationId,
          result.designationWithPrivilege
        );

        this.toaster.success('Successfully added privilege to designation !');
        this.spinnerService.hideSpinner();
      },
      (error) => {
        // console.log(error);
        this.spinnerService.hideSpinner();
        this.toaster.error('Error :', error);
      }
    );
  }

  addPrivilegeToDesignation(
    allDesignations: DesignationAndPrivilege[],
    designationId: number,
    privilege: DesignationWithPrivilege
  ) {
    for (let i = 0; i < allDesignations.length; i++) {
      if (allDesignations[i].designation.designationId === designationId) {
        allDesignations[i].privilege = privilege;
      }
    }
  }

  removePrivilege(privilegeId: number) {
    this.spinnerService.showSpinner();

    this.designationWithPrivilege.removePrivilege(privilegeId).subscribe(
      (result) => {
        // console.log("remove privilege", result);

        this.removePrivilegeFromDesignation(
          this.allDesignations,
          result.designationWithPrivilege.designationId
        );

        this.toaster.success(
          'Successfully removed privilege from designation !'
        );
        this.spinnerService.hideSpinner();
      },
      (error) => {
        this.spinnerService.hideSpinner();
        this.toaster.error('Error :', error);
      }
    );
  }

  removePrivilegeFromDesignation(
    allDesignations: DesignationAndPrivilege[],
    designationId: number
  ) {
    for (let i = 0; i < allDesignations.length; i++) {
      if (allDesignations[i].designation.designationId === designationId) {
        allDesignations[i].privilege = undefined;
      }
    }
  }
}
