import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car, CarState} from '../types/car.types';
import {Observable} from 'rxjs';
import {ApiResponse} from '../types/api-response.types';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private url = "http://localhost:8080/car"

  constructor(private http: HttpClient) {
  }

  public create(body: Car): Observable<ApiResponse<Car>>{
    const endpoint = this.url + "/create"

    return this.http.post<ApiResponse<Car>>(endpoint, body)
  }

  public getAll(): Observable<ApiResponse<Car[]>> {
    const endpoint: string = this.url + "/get"

    return this.http.get<ApiResponse<Car[]>>(endpoint)
  }

  public get(uuid: string): Observable<ApiResponse<Car>> {
    const endpoint: string = this.url + "/get/" + uuid

    return this.http.get<ApiResponse<Car>>(endpoint)
  }

  public changeState(car: Car): Observable<ApiResponse<Car>> {
    const endpoint: string = this.url + "/state"

    return this.http.put<ApiResponse<Car>>(endpoint, car)
  }

  public delete(uuid: string) {
    const endpoint: string = this.url + "/delete/" + uuid

    return this.http.delete(endpoint)
  }
}
