import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router) { }


  // ! subjects
  // selectPacienteExp= new Subject<any>();

  
  url_base = environment.api;





  // obtener_pacientes_url = 'obtener-pacientes';
  agregar_paciente_url = 'agregar-paciente';
  agregar_bebe_url = 'agregar-bebe';
  obtener_bebes_url = 'obtener-bebes';
  actualizar_paciente_url = 'actualizar-paciente';
  pacientes_por_departamento_url = 'pacientes-por-departamento';
  pacientes_por_municipio_url = 'pacientes-por-municipio';

  pacientes_por_lugar_url = 'pacientes-por-lugar';
  pacientes_por_edad_url = 'pacientes-por-edad';
  pacientes_por_lugar_edad_url = 'pacientes-por-lugar-edad';
  bebes_por_depto_url = "nacimientos-por-departamento";
  nacimientos_por_lugar_url = "nacimientos-por-lugar";
  bebes_por_municipio_url = "nacimientos-por-municipio"
  nacimientos_por_año_url = "nacimientos-por-año"
  nacimientos_por_año_lugar_url = "nacimientos-por-año-lugar"
  nacimientos_por_fecha_url = "nacimientos-por-fecha"
  nacimientos_por_mes_año_url = "nacimientos-por-mes"
  nacimientos_por_mes_lugar_año_url = "nacimientos-por-mes-lugar-año"
  nacimientos_por_mes_lugar_url = "nacimientos-por-mes-lugar"

  nacimientos_por_municipi_año_url = "nacimientos-por-municipio-año"
  nacimientos_por_municipio_mes_url = "nacimientos-por-municipio-mes"
  nacimientos_por_municipio_depto_año_url = "nacimientos-por-municipio-depto-año"
  nacimientos_por_municipio_depto_mes_url = "nacimientos-por-municipio-depto-mes"
  nacimientos_por_municipio_depto_año_mes_url = "nacimientos-por-municipio-depto-año-mes"
  nacimientos_por_municipio_mes_año_url = "nacimientos-por-municipio-mes-año"

  set_database_url = "set-database"




  obtener_pacientes_url = "obtener-pacientes"
  obtener_paciente_url = "obtener-paciente"
  actualizar_dato_paciente_url = "actualizar-dato-paciente"
  actualizar_dato_usuario_url = "actualizar-dato-usuario"
  actualizar_nombre_paciente_url = "actualizar-nombre-paciente"
  actualizar_nombre_usuario_url = "actualizar-nombre-usuario"
  actualizar_direccion_paciente_url = "actualizar-direccion-paciente"
  agregarPaciente_url = "agregar-paciente"
  agregarExpediente_url = "crear-expediente"
  obtener_usuarios_url = "obtener-usuarios"
  obtener_usuario_url = "obtener-usuario"
  actualizar_contraseña_usuario_url = "actualizar-password-usuario"
  obtener_roles_url = "obtener-roles"
  agregar_usuario_url = "agregar-usuario"
  actualizar_roles_usuario_url="actualizar-roles-usuario"
  agregarControl_url="agregar-control"
  agregarConsulta_url="agregar-consulta"
  obtener_consultas_paciente_url="obtener-consultas-paciente"

  agregar_examen_fisico_url="agregar-examen-fisico"
  obtener_examen_fisico_url="obtener-examen-fisico"
  obtener_controles_url="obtener-controles-paciente"

  login_url = "login"


  token = ""


  usuario:any;



  obtener_pacientes(token): Observable<any> {
    // let apikey = environment.apikey;

    this.token = atob(token);

    return this.http.get(this.url_base + this.obtener_pacientes_url,
      {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      }
    ).pipe(
      catchError((err) => {


        if (err.status == 401 && err.error.detail=='Token expirado') {
          this.router.navigateByUrl('/token-expired')
        }else if(err.status == 401 && err.error.detail=='Token inválido'){
          this.router.navigateByUrl('/token-invalid')
        }
          //             // this.alertExpiration();
          //           }
        return throwError(err.status);
      })
    );
  }


  obtener_usuarios(token): Observable<any> {
    // let apikey = environment.apikey;

    this.token = atob(token);

    return this.http.get(this.url_base + this.obtener_usuarios_url,
      {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      }
    ).pipe(
      catchError((err) => {
        if (err.status == 401 && err.error.detail=='Token expirado') {
          this.router.navigateByUrl('/token-expired')
        }else if(err.status == 401 && err.error.detail=='Token inválido'){
          this.router.navigateByUrl('/token-invalid')
        }
        return throwError(err.error);
      })
    );
  }


  login(token, username, password): Observable<any> {
    let body: any;
    body = {
      "username": username,
      "password": password
    };

    return this.http
      .post(this.url_base + this.login_url, body)
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );

  }


  actualizar_dato_paciente(token, id_paciente, atributo, valor): Observable<any> {
    let body: any;
    body = {
      "id_paciente": id_paciente,
      "atributo": atributo,
      "valor": valor
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.actualizar_dato_paciente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }




  actualizar_nombre_paciente(token, id_paciente, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido): Observable<any> {
    let body: any;
    body = {
      "id_paciente": id_paciente,
      "primer_nombre": primer_nombre,
      "primer_apellido": primer_apellido,
      "segundo_apellido": segundo_apellido,
      "segundo_nombre": segundo_nombre
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.actualizar_nombre_paciente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  actualizar_direccion_paciente(token, id_paciente, departamento, municipio, calle_avenida): Observable<any> {
    let body: any;
    body = {
      "id_paciente": id_paciente,
      "departamento": departamento,
      "municipio": municipio,
      "calle_avenida": calle_avenida
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.actualizar_direccion_paciente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  agregarPaciente(token, dataForm: any): Observable<any> {
    let body: any;
    body = dataForm

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.agregarPaciente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  agregarExpediente(token, id_usuario, id_paciente): Observable<any> {
    let body: any;
    body = {
      "id_usuario": id_usuario,
      "id_paciente": id_paciente
    }

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.agregarExpediente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }






  obtener_paciente(token, id_paciente): Observable<any> {
    let body: any;
    body = {
      "id_paciente": id_paciente
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.obtener_paciente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }

  obtener_usuario(token, id_usuario): Observable<any> {
    let body: any;
    body = {
      "id_usuario": id_usuario
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.obtener_usuario_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }






  actualizar_dato_usuario(token, id_usuario, atributo, valor): Observable<any> {
    let body: any;
    body = {
      "id_usuario": id_usuario,
      "atributo": atributo,
      "valor": valor
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.actualizar_dato_usuario_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  actualizar_nombre_usuario(token, id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido): Observable<any> {
    let body: any;
    body = {
      "id_usuario": id_usuario,
      "primer_nombre": primer_nombre,
      "primer_apellido": primer_apellido,
      "segundo_apellido": segundo_apellido,
      "segundo_nombre": segundo_nombre
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.actualizar_nombre_usuario_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }

  actualizarContraseñaUsuario(token, id_usuario, pass_actual, pass_nueva): Observable<any> {
    let body: any;
    body = {
      "id_usuario": id_usuario,
      "contraseña_actual": pass_actual,
      "contraseña_nueva": pass_nueva
    }

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.actualizar_contraseña_usuario_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  obtener_roles(token): Observable<any> {
    // let apikey = environment.apikey;

    this.token = atob(token);

    return this.http.get(this.url_base + this.obtener_roles_url,
      {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      }
    ).pipe(
      catchError((err) => {
        if (err.status == 401 && err.error.detail=='Token expirado') {
          this.router.navigateByUrl('/token-expired')
        }else if(err.status == 401 && err.error.detail=='Token inválido'){
          this.router.navigateByUrl('/token-invalid')
        }
        return throwError(err.error);
      })
    );
  }




  agregarUsuario(token, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,correo,
                      telefono,puesto,usuario,dpi,roles): Observable<any> {
    let body: any;
    body = {
      "primer_nombre": primer_nombre,
      "primer_apellido": primer_apellido,
      "segundo_nombre": segundo_nombre,
      "segundo_apellido": segundo_apellido,
      "correo": correo,
      "telefono": telefono,
      "puesto": puesto,
      "usuario": usuario,
      "dpi": dpi,
      "roles": roles
    }

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.agregar_usuario_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }



  actualizar_roles_usuario(token, id_usuario, roles): Observable<any> {
    let body: any;
    body = {
      "id_usuario": id_usuario,
      "roles": roles
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.actualizar_roles_usuario_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  // if (err.status == 401 && err.error.detail=='Token expirado') {
  //   this.router.navigateByUrl('/token-expired')
  // }else if(err.status == 401 && err.error.detail=='Token inválido'){
  //   this.router.navigateByUrl('/token-invalid')
  // }


  agregarControl(token, dataForm: any): Observable<any> {
    let body: any;
    body = dataForm

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.agregarControl_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  agregarConsulta(token, dataForm: any): Observable<any> {
    let body: any;
    body = dataForm

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.agregarConsulta_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  obtenerConsultasPaciente(token, id_control): Observable<any> {
    let body: any;
    body = {
      "id_control": id_control
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.obtener_consultas_paciente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            console.log('Hola')
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }



  agregarExamenFisico(token, dataForm: any): Observable<any> {
    let body: any;
    body = dataForm

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.agregar_examen_fisico_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }

  obtenerExamenFísico(token, id_control): Observable<any> {
    let body: any;
    body = {
      "id_control": id_control
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.obtener_examen_fisico_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }



  obtenerControles(token, id_paciente): Observable<any> {
    let body: any;
    body = {
      "id_paciente": id_paciente
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.obtener_controles_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }



  filtrarNombre_url="filtrar-pacientes-nombre"
  filtrarDPI_url="filtrar-pacientes-dpi"
  filtrarExpediente_url="filtrar-pacientes-expediente"
  filtrarEdad_url="filtrar-pacientes-edad"
  filtrarDireccion_url="filtrar-pacientes-direccion"

  filtrarNombre(token, valor): Observable<any> {
    let body: any;
    body = {
      "valor": valor
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.filtrarNombre_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  filtrarDPI(token, valor): Observable<any> {
    let body: any;
    body = {
      "valor": valor
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.filtrarDPI_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  filtrarExpediente(token, valor): Observable<any> {
    let body: any;
    body = {
      "valor": valor
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.filtrarExpediente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  filtrarEdad(token, valor): Observable<any> {
    let body: any;
    body = {
      "valor": valor
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.filtrarEdad_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  filtrarDireccion(token, valor): Observable<any> {
    let body: any;
    body = {
      "valor": valor
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.filtrarDireccion_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }



  obtener_control_url="obtener-control"

  obtenerControlById(token, id_control): Observable<any> {
    let body: any;
    body = {
      "id_control": id_control
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.obtener_control_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }




  eliminarpaciente_url="eliminar-paciente"
  eliminarPaciente(token, id_paciente): Observable<any> {
    let body: any;
    body = {
      "id_paciente": id_paciente
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.eliminarpaciente_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            console.log('Hola')
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  eliminarusuario_url="eliminar-usuario"
  eliminarUsurio(token, id_usuario): Observable<any> {
    let body: any;
    body = {
      "id_usuario": id_usuario
    };

    this.token = atob(token);
    return this.http
      .post(this.url_base + this.eliminarusuario_url, body, {
        headers: {
          // apikey: this.api_key,
          "x-access-token": this.token
        },
      })
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            console.log('Hola')
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


  cambiarPass_url="recuperar-cuenta"
  cambiarCPass(correo): Observable<any> {
    let body: any;
    body = {
      "correo": correo
    };

    // this.token = atob(token);
    return this.http
      .post(this.url_base + this.cambiarPass_url, body)
      .pipe(
        catchError((err) => {
          if (err.status == 401 && err.error.detail=='Token expirado') {
            // console.log('Hola')
            this.router.navigateByUrl('/token-expired')
          }else if(err.status == 401 && err.error.detail=='Token inválido'){
            this.router.navigateByUrl('/token-invalid')
          }
          return throwError(err.error);
        })
      );
  }


































  // -------------------------------------------------------------------------------
























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


  pacientes_por_lugar_edad(tipo, lugar): Observable<any> {
    let body: any;
    body = {
      rangos: [
        { inicio: 0, final: 18 },
        { inicio: 19, final: 25 },
        { inicio: 26, final: 32 },
        { inicio: 33, final: 45 },
        { inicio: 46, final: 1000 },
      ],
      tipo: tipo,
      lugar: lugar
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


  nacimientos_por_año_lugar(tipo, lugar): Observable<any> {
    let body: any;
    body = {
      tipo: tipo,
      lugar: lugar
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


  nacimiento_por_mes_lugar_año(año, tipo, lugar): Observable<any> {
    let body: any;
    body = {
      "año": año,
      "tipo": tipo,
      "lugar": lugar
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


  nacimiento_por_mes_lugar(tipo, lugar): Observable<any> {
    let body: any;
    body = {
      "tipo": tipo,
      "lugar": lugar
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

  bebes_por_municipio_depto_año(depto, año): Observable<any> {
    let body: any;
    body = {
      "departamento": depto,
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


  bebes_por_municipio_depto_mes(depto, mes): Observable<any> {
    let body: any;
    body = {
      "departamento": depto,
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


  bebes_por_municipio_depto_año_mes(depto, año, mes): Observable<any> {
    let body: any;
    body = {
      "departamento": depto,
      "mes": mes,
      "año": año
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


  bebes_por_municipio_año_mes(año, mes): Observable<any> {
    let body: any;
    body = {
      "mes": mes,
      "año": año
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
