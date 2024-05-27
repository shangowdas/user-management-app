import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ApiCallBack } from '../../http/callback/api-callback';
import { UserManagementService } from '../../service/user-management.service';
import { AddUserRequestDto } from '../../data/add-user-request-dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";
import { AppUtils } from '../../common/app-utils';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule, TableModule, DialogModule, ToastModule,
    ButtonModule
  ],
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, ApiCallBack {
  visible = false
  addUserForm!: FormGroup;
  login!: FormGroup;
  buttonIsLoading = false
  buttonIsLoading1 = false
  isFormSubmitted = false
  constructor(private router: Router,
    public userMgmtService: UserManagementService,
    public formBuilder: FormBuilder,
    public messageService: MessageService,
  ) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLoginClick(): void {
    if (!this.login.valid) {

      AppUtils.showWarnViaToast(
        this.messageService,
        "Please enter both userName and Password"
      );
      return
    }
    this.buttonIsLoading = true
    this.userMgmtService.login(this, this.login?.value?.username, this.login?.value?.password)

  }

  openDialog(): void {
    this.visible = true
  }

  public onAddUser(): void {
    this.isFormSubmitted = true
    if (this.addUserForm?.valid) {
      this.buttonIsLoading1 = true
      let addUser: AddUserRequestDto = new AddUserRequestDto();
      addUser.name = this.addUserForm?.value?.name;
      addUser.username = this.addUserForm?.value?.username;
      addUser.password = this.addUserForm?.value?.password;
      addUser.email = this.addUserForm?.value?.email;
      addUser.phone = this.addUserForm?.value?.phone;
      addUser.role = this.addUserForm?.value?.role;

      this.userMgmtService.addUser(this, addUser)

    } else {
      AppUtils.showWarnViaToast(
        this.messageService,
        "Please enter required fields"
      );
    }
  }

  onResult(data: any, type: any, other?: any): void {
    switch (type) {
      case 'post - /user-management/v1/user':
        this.buttonIsLoading1 = false
        this.addUserForm.reset();
        this.isFormSubmitted = false
        AppUtils.showSuccessViaToast(
          this.messageService,
          "User created Successfully"
        )
        this.visible = false
        break;
      case 'get - /user-management/v1/user/login/':
        this.buttonIsLoading = false
        this.router.navigateByUrl('/home');
        break;
    }
  }
  onError(err: any, type: any, other?: any): void {
    switch (type) {
      case 'post - /user-management/v1/user':
        this.buttonIsLoading1 = false
        AppUtils.showWarnViaToast(
          this.messageService,
          err.error
        );
        break;
      case 'get - /user-management/v1/user/login/':
        // alert(err.error)
        this.buttonIsLoading = false
        AppUtils.showWarnViaToast(
          this.messageService,
          err.error
        );
        break;
    }
  }
}
