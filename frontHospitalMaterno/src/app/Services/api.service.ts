import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  map,
  filter,
  switchMap,
  catchError,
  retry,
  last,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = {
    "Content-Type": "application/json",
  };
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }



  tokenAuth(token: any): Observable<any> {

    // let apikey = environment.apikey;

    return this.http.post("url", {}, {
        headers: {
            // apikey: apikey,
            token: token
        },
    }).pipe(
        catchError(err => {

            // this.getSessionInformation_(this.token).then((data) => {
            // })
          
            if(err.status==401){
                // this.alertExpiration();
            }
            return throwError(err.status)
        })
    );
}
}
