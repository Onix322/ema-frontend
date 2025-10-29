import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../types/car.types';
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
}
