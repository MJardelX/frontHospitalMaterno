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
  agregar_bebe_url = 'agregar-bebe';
  obtener_bebes_url = 'obtener-bebes';
  actualizar_paciente_url = 'actualizar-paciente';
  pacientes_por_departamento_url = 'pacientes-por-departamento';
  pacientes_por_municipio_url = 'pacientes-por-municipio';

  pacientes_por_lugar_url = 'pacientes-por-lugar';
  pacientes_por_edad_url = 'pacientes-por-edad';
  pacientes_por_lugar_edad_url = 'pacientes-por-lugar-edad';
  bebes_por_depto_url="nacimientos-por-departamento";
  nacimientos_por_lugar_url="nacimientos-por-lugar";
  bebes_por_municipio_url="nacimientos-por-municipio"
  nacimientos_por_año_url="nacimientos-por-año"
  nacimientos_por_año_lugar_url="nacimientos-por-año-lugar"
  nacimientos_por_fecha_url="nacimientos-por-fecha"
  nacimientos_por_mes_año_url="nacimientos-por-mes"
  nacimientos_por_mes_lugar_año_url="nacimientos-por-mes-lugar-año"
  nacimientos_por_mes_lugar_url="nacimientos-por-mes-lugar"

  nacimientos_por_municipi_año_url="nacimientos-por-municipio-año"
  nacimientos_por_municipio_mes_url="nacimientos-por-municipio-mes"
  nacimientos_por_municipio_depto_año_url="nacimientos-por-municipio-depto-año"
  nacimientos_por_municipio_depto_mes_url="nacimientos-por-municipio-depto-mes"
  nacimientos_por_municipio_depto_año_mes_url="nacimientos-por-municipio-depto-año-mes"
  nacimientos_por_municipio_mes_año_url="nacimientos-por-municipio-mes-año"

  set_database_url="set-database"
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
      pais: 'Guatemala',
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
      pais: 'Guatemala',
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
      pais: 'Guatemala',
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

  pacientes_por_depto(): Observable<any> {
    // let apikey = environment.apikey;

    return this.http
      .get(this.url_base + this.pacientes_por_departamento_url)
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

  pacientes_por_municipio(departamento): Observable<any> {
    let body: any;
    body = {
      departamento: departamento,
    };

    return this.http
      .post(this.url_base + this.pacientes_por_municipio_url, body, {
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

  pacientes_por_lugar(tipo): Observable<any> {
    let body: any;
    body = {
      tipo: tipo,
    };

    return this.http
      .post(this.url_base + this.pacientes_por_lugar_url, body, {
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

  pacientes_por_edad(): Observable<any> {
    let body: any;
    body = {
      rangos: [
        { inicio: 0, final: 18 },
        { inicio: 19, final: 25 },
        { inicio: 26, final: 32 },
        { inicio: 33, final: 45 },
        { inicio: 46, final: 1000 },
      ],
    };

    return this.http
      .post(this.url_base + this.pacientes_por_edad_url, body, {
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


  pacientes_por_lugar_edad(tipo,lugar): Observable<any> {
    let body: any;
    body = {
      rangos: [
        { inicio: 0, final: 18 },
        { inicio: 19, final: 25 },
        { inicio: 26, final: 32 },
        { inicio: 33, final: 45 },
        { inicio: 46, final: 1000 },
      ],
      tipo:tipo,
      lugar:lugar
    };

    return this.http
      .post(this.url_base + this.pacientes_por_lugar_edad_url, body, {
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



  bebes_por_depto(): Observable<any> {
    // let apikey = environment.apikey;

    return this.http
      .get(this.url_base + this.bebes_por_depto_url)
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


  bebes_por_lugar(tipo): Observable<any> {
    let body: any;
    body = {
      tipo: tipo,
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_lugar_url, body, {
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


  bebes_por_municipio(departamento): Observable<any> {
    let body: any;
    body = {
      departamento: departamento,
    };

    return this.http
      .post(this.url_base + this.bebes_por_municipio_url, body, {
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


  nacimientos_por_año(): Observable<any> {
    // let apikey = environment.apikey;

    return this.http
      .get(this.url_base + this.nacimientos_por_año_url)
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


  nacimientos_por_año_lugar(tipo,lugar): Observable<any> {
    let body: any;
    body = {
      tipo: tipo,
      lugar:lugar
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_año_lugar_url, body, {
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



  nacimiento_por_fecha(tipo): Observable<any> {
    let body: any;
    body = {
      tipo: tipo,
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_fecha_url, body, {
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


  nacimiento_por_mes_año(tipo): Observable<any> {
    let body: any;
    body = {
      "año": tipo,
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_mes_año_url, body, {
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


  nacimiento_por_mes_lugar_año(año,tipo,lugar): Observable<any> {
    let body: any;
    body = {
      "año": año,
      "tipo":tipo,
      "lugar":lugar
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_mes_lugar_año_url, body, {
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


  nacimiento_por_mes_lugar(tipo,lugar): Observable<any> {
    let body: any;
    body = {
      "tipo":tipo,
      "lugar":lugar
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_mes_lugar_url, body, {
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

  bebes_por_municipio_año(año): Observable<any> {
    let body: any;
    body = {
      "año": año,
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_municipi_año_url, body, {
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

  bebes_por_municipio_mes(mes): Observable<any> {
    let body: any;
    body = {
      "mes": mes,
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_municipio_mes_url, body, {
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

  bebes_por_municipio_depto_año(depto,año): Observable<any> {
    let body: any;
    body = {
      "departamento":depto,
      "año": año,
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_municipio_depto_año_url, body, {
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


  bebes_por_municipio_depto_mes(depto,mes): Observable<any> {
    let body: any;
    body = {
      "departamento":depto,
      "mes": mes,
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_municipio_depto_mes_url, body, {
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


  bebes_por_municipio_depto_año_mes(depto,año,mes): Observable<any> {
    let body: any;
    body = {
      "departamento":depto,
      "mes": mes,
      "año":año
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_municipio_depto_año_mes_url, body, {
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


  bebes_por_municipio_año_mes(año,mes): Observable<any> {
    let body: any;
    body = {
      "mes": mes,
      "año":año
    };

    return this.http
      .post(this.url_base + this.nacimientos_por_municipio_mes_año_url, body, {
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

  set_database(data): Observable<any> {
    let body: any;
    body = {
      "database": data,
    };

    return this.http
      .post(this.url_base + this.set_database_url, body, {
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
