import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';


const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
const API_HOST = environment.API_HOST;

@Injectable()
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  // get weather
  getWeather(qP): Observable<any> {
    console.log(qP);
    return this.httpClient
      .get<any>(`${API_URL}history.json`, {
        params: { ...qP },
        headers: {
          'x-rapidapi-host': API_HOST,
          'x-rapidapi-key': API_KEY
        }
      })
      .pipe(catchError(this.errorHandle));
  }

  // error
  errorHandle(error): any {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // get client side error
      errorMessage = error;
    } else {
      // get sever side error
      errorMessage = error;
    }
    return throwError(errorMessage);
  }
}
