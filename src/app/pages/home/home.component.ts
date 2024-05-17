import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddUserRequestDto } from '../../data/add-user-request-dto';
import { AddUserResponseDto } from '../../data/add-user-response-dto';
import { GetUsersDto } from '../../data/get-users-dto';
import { UpdateUserRequestDto } from '../../data/update-user-request-dto';
import { UserManagementService } from '../../service/user-management.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ApiCallBack } from '../../http/callback/api-callback';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule, TableModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, ApiCallBack {
  public updateUser: UpdateUserRequestDto = new UpdateUserRequestDto;
  public selectedUser: GetUsersDto = new GetUsersDto;
  addUserForm!: FormGroup;

  searchUserForm!: FormGroup;
  toastMessage = '';
  toastIt = false;
  constructor(
    public userMgmtService: UserManagementService,
    public formBuilder: FormBuilder
  ) {}
  

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: [''],
      username: [''],
      password: [''],
      email: [''],
      role: [''],
      phone: [''],
    });

    this.searchUserForm = this.formBuilder.group({
      searchName: [''],
    });

    this.getUsers();
  }

  public getUsers(searchName?: string): void {
    let params: HttpParams = new HttpParams();
    params = params.append('pageSize', 100);
    params = params.append('pageNo', 0);
    params = params.append('sortBy', '');
    params = params.append('name', searchName=== undefined || searchName == '' ? '' : searchName);
    params = params.append('username', '');
    params = params.append('role', '');
    this.userMgmtService.getUsers(this,params);
  }

  public onAddUser(): void {
    if (this.addUserForm?.valid) {
      let addUser: AddUserRequestDto = new AddUserRequestDto();
      addUser.name = this.addUserForm?.value?.name;
      addUser.username = this.addUserForm?.value?.username;
      addUser.password = this.addUserForm?.value?.password;
      addUser.email = this.addUserForm?.value?.email;
      addUser.phone = this.addUserForm?.value?.phone;
      addUser.role = this.addUserForm?.value?.role;

      this.userMgmtService.addUser(this, addUser)
    //   .subscribe(
    //     (response: any) => {
    //       console.log(response);
    //       this.getUsers();
    //       this.addUserForm.reset();
    //     },
    //     (error: HttpErrorResponse) => {
    //       alert(error.message);
    //       this.addUserForm.reset();
    //     }
    //   );
    // } else {
    //   this.toastMessage = 'Please enter reqired fields.';
    //   // alert('');
    }
  }

  public onUpdateUser(): void {
    // this.userMgmtService.updateEmployee(employee).subscribe(
    //   (response: Employee) => {
    //     console.log(response);
    //     this.getUsers();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
  }

  public onDeleteUser(employeeId: number): void {
    // this.userMgmtService.deleteEmployee(employeeId).subscribe(
    //   (response: void) => {
    //     console.log(response);
    //     this.getUsers();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // );
  }

  public searchUsers(): void {
    if (this.searchUserForm?.value?.searchName?.length > 3) {
      this.getUsers(this.searchUserForm?.value?.searchName);
    }
  }

  public onOpenModal(user: GetUsersDto, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.selectedUser = user;
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'delete') {
      this.selectedUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    if (container != null) {
      container.appendChild(button);
    }
    
    button.click();
  }

  openAddUserDialog(): void {}

  onResult(data: any, type: any, other?: any): void {
    switch (type) {
      case 'get - /user-management/v1/user':
        this.userMgmtService.users = data.users

        break;
        case 'post - /user-management/v1/user':
        this.getUsers();
          this.addUserForm.reset();
    break
    }
  }
  onError(err: any, type: any, other?: any): void {
    switch (type) {
      case 'get - /user-management/v1/user':

        break;
    }
  }
}
