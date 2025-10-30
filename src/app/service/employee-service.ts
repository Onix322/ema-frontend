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

  public get(uuid: string): Observable<ApiResponse<UserData>> {
    const endpoint = this.url + "/get/" + uuid;

    return this.http.get<ApiResponse<UserData>>(endpoint)
  }

  public delete(uuid: string): Observable<ApiResponse<boolean>> {
    const endpoint: string = this.url + "/delete/" + uuid

    return this.http.delete<ApiResponse<boolean>>(endpoint)
  }

  public edit(body: UserData): Observable<ApiResponse<UserData>> {
    const endpoint: string = this.url + "/update"

    return this.http.put<ApiResponse<UserData>>(endpoint, body)
  }

  public assignCar(uuid: string, carUuid: string): Observable<ApiResponse<UserData>> {
    const endpoint: string = this.url + "/assign/" + uuid + "/" + carUuid

    return this.http.patch<ApiResponse<UserData>>(endpoint, null)
  }

  public unassignCar(uuid: string): Observable<ApiResponse<UserData>> {
    const endpoint: string = this.url + "/unassign/" + uuid + "/"

    return this.http.patch<ApiResponse<UserData>>(endpoint, null)
  }

  public autoAssign(uuid: string): Observable<ApiResponse<UserData>> {
    const endpoint: string = this.url + "/assign/auto/" + uuid

    return this.http.patch<ApiResponse<UserData>>(endpoint, null)
  }
}
