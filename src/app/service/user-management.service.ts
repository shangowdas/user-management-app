import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserRequestDto } from '../data/add-user-request-dto';
import { GetUsersDto } from '../data/get-users-dto';
import { UpdateUserRequestDto } from '../data/update-user-request-dto';
import { environment } from '../../environment/environment';
import { ApiService } from './common/api.service';
import { ApiCallBack } from '../http/callback/api-callback';
import { ApiCallHelper } from '../http/api-call-helper';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiServerUrl = environment.apiBaseUrl;

  public users: GetUsersDto[] = [];
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getUsers(
    callback: ApiCallBack,
    params: HttpParams
  ): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = '/user-management/v1/user';
    apiObject.method = "GET";
    apiObject.params = params;
   

    this.apiService.getData(
      apiObject,
      callback,
      'get - /user-management/v1/user',
      // request
    );
  }

  // public getUsers(params: HttpParams): Observable<GetUsersDto[]> {
  //   return this.http.get<GetUsersDto[]>(`${this.apiServerUrl}/user-management/v1/user`);
  // }

  addUser(
    callback: ApiCallBack,
    params: AddUserRequestDto
  ): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = '/user-management/v1/user';
    apiObject.method = "POST";
    apiObject.params = params;
   

    this.apiService.getData(
      apiObject,
      callback,
      'post - /user-management/v1/user',
      // request
    );
  }

  // public addUser(addUser: AddUserRequestDto): Observable<Object> {
  //   return this.http.post<AddUserRequestDto>(
  //     `${this.apiServerUrl}/user-management/v1/user`,
  //     addUser
  //   );
  // }

  public updateUser(
    updateUser: UpdateUserRequestDto
  ): Observable<UpdateUserRequestDto> {
    return this.http.put<UpdateUserRequestDto>(
      `${this.apiServerUrl}/um/update/user`,
      updateUser
    );
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/user/${userId}`);
  }
}
