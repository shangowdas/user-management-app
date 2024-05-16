import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserRequestDto } from '../data/add-user-request-dto';
import { GetUsersDto } from '../data/get-users-dto';
import { UpdateUserRequestDto } from '../data/update-user-request-dto';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiServerUrl = environment.apiBaseUrl;

  public users: GetUsersDto[] = [];
  constructor(private http: HttpClient) {}

  public getUsers(params: HttpParams): Observable<GetUsersDto[]> {
    return this.http.get<GetUsersDto[]>(`${this.apiServerUrl}/user-management/v1/user`);
  }

  public addUser(addUser: AddUserRequestDto): Observable<Object> {
    return this.http.post<AddUserRequestDto>(
      `${this.apiServerUrl}/user-management/v1/user`,
      addUser
    );
  }

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
