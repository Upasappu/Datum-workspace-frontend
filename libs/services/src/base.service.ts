import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { LocalStorageService } from '@datum/services';
import {APP_URL} from '@datum/utils';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private httpClient = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const skey = this.localStorageService.getItem('skey');

    if (skey) {
      headers = headers.set('skey', skey);
    }
    return headers;
  }


    get<T>(endpoint: string): Observable<T> {
    return this.httpClient.get<T>(`${APP_URL.API}${endpoint}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  ///POST Request
  /// This method is used to send POST requests to the server.
  /// @param endpoint - The API endpoint to which the request is sent.
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.httpClient
      .post<T>(`${APP_URL.API}${endpoint}`, data, {
        headers: this.getHeaders(),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            return throwError(() => error.error);
          }
          return throwError(() => error);
        })
      );
  }
}