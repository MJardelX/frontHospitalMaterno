import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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
  providedIn: 'root',
})


export class ApiService {
  headers = {
    'Content-Type': 'application/json',
  };
  getPersonsEmmit = new  EventEmitter<any>();

  constructor(private http: HttpClient, private router: Router) {}

  url_base = '/control-medico/';
  obtener_pacientes_url = 'obtener-pacientes';
  agregar_paciente_url = 'agregar-paciente';

  obtener_pacientes(): Observable<any> {
    // let apikey = environment.apikey;

    return this.http.get(this.url_base + this.obtener_pacientes_url).pipe(
      catchError((err) => {
        // this.getSessionInformation_(this.token).then((data) => {
        // })

        if (err.status == 401) {
          // this.alertExpiration();
        }
        return throwError(err.status);
      })
    );
  }


  agregar_paciente(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,dpi,
                    fecha_nacimiento, departamento, municipio, direccion, pais): Observable<any> {
   

    let body:any
    body={
      "primer_nombre":primer_nombre,
      "segundo_nombre":segundo_nombre,
      "primer_apellido":primer_apellido,
      "segundo_apellido":segundo_apellido,
      "dpi":dpi,
      "fecha_nacimiento":fecha_nacimiento,
      "departamento":departamento,
      "municipio":municipio,
      "direccion":direccion,
      "pais":pais
  }                  

    return this.http.post(this.url_base + this.agregar_paciente_url, body, {
      headers:this.headers
    }).pipe(
      catchError((err) => {
        // this.getSessionInformation_(this.token).then((data) => {
        // })

        if (err.status == 401) {
          // this.alertExpiration();
        }
        return throwError(err.status);
      })
    );
  }



}
