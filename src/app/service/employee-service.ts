import {Injectable} from '@angular/core';
import {UserData} from '../types/user.types';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../types/api-response.types';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url: string = "http://localhost:8080/employee"
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http
  }

  public create(body: UserData): Observable<ApiResponse<UserData>> {
    const endpoint = this.url + "/create";

    return this.http.post<ApiResponse<UserData>>(endpoint, body)
  }

  public getAll(): Observable<ApiResponse<UserData[]>> {
    const endpoint = this.url + "/get";

    return this.http.get<ApiResponse<UserData[]>>(endpoint)
  }

  public delete(uuid: string): Observable<ApiResponse<boolean>> {
    const endpoint: string = this.url + "/delete/" + uuid
    console.log("click")
    return this.http.delete<ApiResponse<boolean>>(endpoint)
  }
}
