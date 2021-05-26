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
  getPersonsEmmit = new EventEmitter<any>();

  constructor(private http: HttpClient, private router: Router) {}

  url_base = '/control-medico/';
  obtener_pacientes_url = 'obtener-pacientes';
  agregar_paciente_url = 'agregar-paciente';
  agregar_bebe_url="agregar-bebe"
  obtener_bebes_url="obtener-bebes"
  actualizar_paciente_url="actualizar-paciente"

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

  obtener_bebes(): Observable<any> {
    // let apikey = environment.apikey;

    return this.http.get(this.url_base + this.obtener_bebes_url).pipe(
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

  agregar_paciente(
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    dpi,
    fecha_nacimiento,
    departamento,
    municipio,
    direccion,
    pais
  ): Observable<any> {
    let body: any;
    body = {
      primer_nombre: primer_nombre,
      segundo_nombre: segundo_nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
      dpi: dpi,
      fecha_nacimiento: fecha_nacimiento,
      departamento: departamento,
      municipio: municipio,
      direccion: direccion,
      pais: "Guatemala",
    };

    return this.http
      .post(this.url_base + this.agregar_paciente_url, body, {
        headers: this.headers,
      })
      .pipe(
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

  agregar_bebe(
    dpi_mama,
    peso,
    sexo,
    fecha_nacimiento,
    departamento,
    municipio,
    pais
  ): Observable<any> {
    let body: any;
    body = {
      dpi_mama: dpi_mama,
      peso: peso,
      sexo: sexo,
      fecha_nacimiento: fecha_nacimiento,
      pais: "Guatemala",
      departamento: departamento,
      municipio: municipio,
    };

    return this.http
      .post(this.url_base + this.agregar_bebe_url, body, {
        headers: this.headers,
      })
      .pipe(
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



  actualizar_paciente(
    id,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    departamento,
    municipio,
    direccion,
    pais
  ): Observable<any> {
    let body: any;
    body = {
      primer_nombre: primer_nombre,
      segundo_nombre: segundo_nombre,
      primer_apellido: primer_apellido,
      segundo_apellido: segundo_apellido,
      id: id,
      fecha_nacimiento: fecha_nacimiento,
      departamento: departamento,
      municipio: municipio,
      direccion: direccion,
      pais: "Guatemala",
    };

    return this.http
      .post(this.url_base + this.actualizar_paciente_url, body, {
        headers: this.headers,
      })
      .pipe(
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
