import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiCallHelper } from '../../http/api-call-helper';
import { ApiCallBack } from '../../http/callback/api-callback';
import { AppUtils } from '../../common/app-utils';
import { MessageService } from 'primeng/api';
import { MessageType } from '../../enum/messageType.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient,
    public sanitizer: DomSanitizer,
    ) { }

  getData(
    apiObject: ApiCallHelper,
    callback: ApiCallBack,
    requestServiceType: any,
    dataToReturn?: any
  ): Observable<any> {
    let data: any;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    const httpGetOptions = {
      params: apiObject.params,
    };
    switch (apiObject.method) {
      case "GET":
        {
          data = this.http
            .get(environment.apiBaseUrl + apiObject.service, httpGetOptions)
            .subscribe(
              (result) => {
                callback.onResult(result, requestServiceType, dataToReturn);
              },
              (err) => {
                callback.onError(err, requestServiceType, dataToReturn);
              }
            );
        }
        break;
      case "POST":
        data = this.http
          .post(
            environment.apiBaseUrl + apiObject.service,
            apiObject.params,
            httpOptions
          )
          .subscribe(
            (result) => {
              

              callback.onResult(result, requestServiceType, dataToReturn);
            },
            (err) => {
              
              callback.onError(err, requestServiceType, dataToReturn);
            }
          );
        break;
      case "PUT":
        data = this.http
          .put<any>(environment.apiBaseUrl + apiObject.service, apiObject.params)
          .subscribe(
            (result) => {
             
              callback.onResult(result, requestServiceType, dataToReturn);
            },
            (err) => {
              
              callback.onError(err, requestServiceType, dataToReturn);
            }
          );
        break;
      case "DELETE":
        {
          data = this.http
            .delete(environment.apiBaseUrl + apiObject.service + apiObject.params)
            .subscribe(
              (result) => {
                
                callback.onResult(result, requestServiceType, dataToReturn);
              },
              (err) => {
               
                callback.onError(err, requestServiceType, dataToReturn);
              }
            );
        }
        break;
     
      default:
        break;
    }
    return data;
  }

  
}
