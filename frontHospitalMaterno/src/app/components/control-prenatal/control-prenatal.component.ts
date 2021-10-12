import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-control-prenatal',
  templateUrl: './control-prenatal.component.html',
  styleUrls: ['./control-prenatal.component.css']
})
export class ControlPrenatalComponent implements OnInit, OnDestroy {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private route: ActivatedRoute,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar
  ) {
    this.iniciarFormularios()
  }

  Location: any;

  id_control

  token: any;
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);

    console.log('init')

    this.id_control = this.route.snapshot.params['id_control']

    this.form_tipo_control.get('id_control').setValue(this.id_control)


    let fecha_creacion = (new Date)
    this.form_tipo_control.get('fecha_visita').setValue(fecha_creacion)

    this.token = localStorage.getItem('token')
    // this.
  }



  migrante = {
    si: false,
    no: true
  }



  form_ex_fisico: FormGroup;
  form_tipo_control: FormGroup;
  form_signos_peligro: FormGroup;
  form_signos_vitales: FormGroup;
  form_ex_general: FormGroup;
  form_ex_obs: FormGroup;
  form_ex_gin: FormGroup;
  form_ex_lab: FormGroup;
  form_clasificacion: FormGroup;
  form_conducta: FormGroup;
  form_consejeria: FormGroup;

  iniciarFormularios() {

    this.form_ex_fisico = new FormGroup({

    })

    // !2
    this.form_tipo_control = new FormGroup({
      "id_control": new FormControl('', [Validators.required]),
      "meses_embarazo": new FormControl('', [Validators.required]),
      "fecha_visita": new FormControl('', [Validators.required]),
    })

    // !2
    this.form_signos_peligro = new FormGroup({
      "sintomas_peligro": new FormControl('', [Validators.required]),
      "des_sintomas": new FormControl(' ', [Validators.required]),
    })

    //  !7
    this.form_signos_vitales = new FormGroup({
      "presion": new FormControl('', [Validators.required]),
      "temperatura": new FormControl('', [Validators.required]),
      "peso": new FormControl('', [Validators.required]),
      "estatura": new FormControl('', [Validators.required]),
      "imc": new FormControl('', [Validators.required]),
      "respiraciones_min": new FormControl('', [Validators.required]),
      "frecuencia_cardiaca_materna": new FormControl('', [Validators.required]),
    })

    this.form_ex_general = new FormGroup({
      "estado_general": new FormControl('', [Validators.required]),
      "estado_bucodental": new FormControl('', [Validators.required]),
    })

    this.form_ex_obs = new FormGroup({
      "altura_uterina": new FormControl('', [Validators.required]),
      "movimientos_fetales": new FormControl('', [Validators.required]),
      "frecuencia_cardiaca": new FormControl('', [Validators.required]),
      "presentacion_leopold": new FormControl('', [Validators.required]),
    })

    this.form_ex_gin = new FormGroup({
      "presencia_sangre": new FormControl('', [Validators.required]),
      "des_presencia_sangre": new FormControl(' ', [Validators.required]),
      "verrugas_herpes": new FormControl('', [Validators.required]),
      "des_verrugas_herpes": new FormControl(' ', [Validators.required]),
      "flujo_vaginal": new FormControl('', [Validators.required]),
    })

    this.form_ex_lab = new FormGroup({
      "hemoglobina": new FormControl('', [Validators.required]),
      "grupo_rh": new FormControl('', [Validators.required]),
      "orina": new FormControl('', [Validators.required]),
      "glicemia": new FormControl('', [Validators.required]),
      "vdrl": new FormControl('', [Validators.required]),
      "vih": new FormControl('', [Validators.required]),
      "papanicolaou": new FormControl('', [Validators.required]),
      "infecciones": new FormControl('', [Validators.required]),
    })

    this.form_clasificacion = new FormGroup({
      "sem_embarazo_fur": new FormControl('', [Validators.required]),
      "problemas_detectados": new FormControl('', [Validators.required]),
    })


    this.form_conducta = new FormGroup({
      "sulfato_ferroso": new FormControl('', [Validators.required]),
      "acido_folico": new FormControl('', [Validators.required]),
      "vacunacion_madre": new FormControl('', [Validators.required]),
    })


    this.form_consejeria = new FormGroup({
      "alimentacion": new FormControl('', [Validators.required]),
      "senales_peligro": new FormControl('', [Validators.required]),
      "consejeria_vih": new FormControl('', [Validators.required]),
      "plan_parto": new FormControl('', [Validators.required]),
      "plan_emergencia": new FormControl('', [Validators.required]),
      "lactancia_materna": new FormControl('', [Validators.required]),
      "metodos_planificacion": new FormControl('', [Validators.required]),
      "importancia_postparto": new FormControl('', [Validators.required]),
      "importancia_recien_nacido": new FormControl('', [Validators.required])
    })



  }


  cheks = {
    sintomas_peligro: {
      "si": false,
      "no": false
    },
    estado_general: {
      "si": false,
      "no": false
    },
  }

  checkConsejeria = {
    alimentacion: {
      "si": false,
      "no": false
    },
    senales_peligro: {
      "si": false,
      "no": false
    },
    consejeria_vih: {
      "si": false,
      "no": false
    },
    plan_parto: {
      "si": false,
      "no": false
    },
    plan_emergencia: {
      "si": false,
      "no": false
    },
    lactancia_materna: {
      "si": false,
      "no": false
    },
    metodos_planificacion: {
      "si": false,
      "no": false
    },
    importancia_postparto: {
      "si": false,
      "no": false
    },
    importancia_recien_nacido: {
      "si": false,
      "no": false
    }
  }



  seleccionarCheckConsejeria(att, value) {
    // if(value=='si'){
    // this.signos[signo][value]=!this.migrante[signo][value]
    // if (value == 'si') {
    this.checkConsejeria[att]['no'] = false
    // } else {
    this.checkConsejeria[att]['si'] = false
    // }
    this.checkConsejeria[att][value] = !this.checkConsejeria[att][value]

    this.form_consejeria.get(att).setValue(value);
    // console.log(this.signos[signo])
    // }
  }


  checkExGin = {
    presencia_sangre: {
      "si": false,
      "no": false
    },
    verrugas_herpes: {
      "si": false,
      "no": false
    },
    flujo_vaginal: {
      "si": false,
      "no": false
    }
  }

  seleccionarCheckGin(att, value) {
    // if(value=='si'){
    // this.signos[signo][value]=!this.migrante[signo][value]
    // if (value == 'si') {
    this.checkExGin[att]['no'] = false
    // } else {
    this.checkExGin[att]['si'] = false
    // }
    this.checkExGin[att][value] = !this.checkExGin[att][value]

    this.form_ex_gin.get(att).setValue(value);
    // console.log(this.signos[signo])
    // }
  }

  movimientos_fetales = {
    si: false,
    no: false
  }

  seleccionarMovimientosFetales(value) {
    // if (value == 'si') {
    this.movimientos_fetales['no'] = false
    // } else {
    this.movimientos_fetales['si'] = false
    // }
    this.movimientos_fetales[value] = !this.movimientos_fetales[value]

    this.form_ex_obs.get('movimientos_fetales').setValue(value);
  }


  estado_general = {
    si: false,
    no: false
  }

  seleccionarEstadoGeneral(value) {
    // if (value == 'si') {
    this.estado_general['no'] = false
    // } else {
    this.estado_general['si'] = false
    // }
    this.estado_general[value] = !this.estado_general[value]

    this.form_ex_general.get('estado_general').setValue(value);
  }


  sintomas_peligro = {
    si: false,
    no: false
  }

  seleccionarSintomasPeligro(value) {
    // if (value == 'si') {
    this.sintomas_peligro['no'] = false
    // } else {
    this.sintomas_peligro['si'] = false
    // }
    this.sintomas_peligro[value] = !this.sintomas_peligro[value]

    this.form_signos_peligro.get('sintomas_peligro').setValue(value);
  }




  sub_guardar_consulta: Subscription
  cargando = false;
  guardo = false;
  guardarConsulta() {
    this.guardo = true;


    console.log()


    if (!moment(this.form_tipo_control.get('fecha_visita').value, 'YYYY-MM-DD', true).isValid()) {
      this.openSnackBar('Ingrese una fecha válida', 'red-snackbar');
    } else if (
      this.form_tipo_control.invalid &&
      this.form_signos_peligro.invalid &&
      this.form_signos_vitales.invalid &&
      this.form_ex_general.invalid &&
      this.form_ex_obs.invalid &&
      this.form_ex_gin.invalid &&
      this.form_ex_lab.invalid &&
      this.form_clasificacion.invalid &&
      this.form_conducta.invalid &&
      this.form_consejeria.invalid) {
      this.openSnackBar('Debe llenar todos los apartados de la consulta', 'red-snackbar');
    } else if (this.form_tipo_control.invalid) {
      this.openSnackBar('Debe llenar los campos de examen físico', 'red-snackbar');

    }
    else if (this.form_signos_peligro.invalid) {
      this.openSnackBar('Debe llenar los campos de signos o sintomas de peligro', 'red-snackbar');

    } else if (this.form_signos_vitales.invalid) {
      this.openSnackBar('Debe llenar los campos de signos vitales', 'red-snackbar');

    } else if (this.form_ex_general.invalid) {
      this.openSnackBar('Debe llenar los campos de examen general', 'red-snackbar');

    } else if (this.form_ex_obs.invalid) {
      this.openSnackBar('Debe llenar los campos de examen obstétrico', 'red-snackbar');

    } else if (this.form_ex_gin.invalid) {
      this.openSnackBar('Debe llenar los campos de examen ginecológico', 'red-snackbar');

    } else if (this.form_ex_lab.invalid) {
      this.openSnackBar('Debe llenar los campos de examenes de laboratorio', 'red-snackbar');

    } else if (this.form_clasificacion.invalid) {
      this.openSnackBar('Debe llenar los campos de clasificación', 'red-snackbar');

    } else if (this.form_conducta.invalid) {
      this.openSnackBar('Debe llenar los campos de conducta', 'red-snackbar');

    } else if (this.form_consejeria.invalid) {
      this.openSnackBar('Debe llenar los campos de consejeria', 'red-snackbar');

    } else {
      let data = {}
      data = Object.assign(data, this.form_tipo_control.getRawValue())
      data = Object.assign(data, this.form_signos_peligro.getRawValue())
      data = Object.assign(data, this.form_signos_vitales.getRawValue())
      data = Object.assign(data, this.form_ex_general.getRawValue())
      data = Object.assign(data, this.form_ex_obs.getRawValue())
      data = Object.assign(data, this.form_ex_gin.getRawValue())
      data = Object.assign(data, this.form_ex_lab.getRawValue())
      data = Object.assign(data, this.form_clasificacion.getRawValue())
      data = Object.assign(data, this.form_conducta.getRawValue())
      data = Object.assign(data, this.form_consejeria.getRawValue())


      this.cargando = true;
      this.sub_guardar_consulta = this.apiServices.agregarConsulta(this.token, data).subscribe(d => {

        if (d.status = 'Success') {
          this.sintomas_peligro = {
            si: false,
            no: false
          }

          this.estado_general = {
            si: false,
            no: false
          }

          this.checkConsejeria = {
            alimentacion: {
              "si": false,
              "no": false
            },
            senales_peligro: {
              "si": false,
              "no": false
            },
            consejeria_vih: {
              "si": false,
              "no": false
            },
            plan_parto: {
              "si": false,
              "no": false
            },
            plan_emergencia: {
              "si": false,
              "no": false
            },
            lactancia_materna: {
              "si": false,
              "no": false
            },
            metodos_planificacion: {
              "si": false,
              "no": false
            },
            importancia_postparto: {
              "si": false,
              "no": false
            },
            importancia_recien_nacido: {
              "si": false,
              "no": false
            }
          }

          this.checkExGin = {
            presencia_sangre: {
              "si": false,
              "no": false
            },
            verrugas_herpes: {
              "si": false,
              "no": false
            },
            flujo_vaginal: {
              "si": false,
              "no": false
            }
          }
          this.movimientos_fetales = {
            si: false,
            no: false
          }



          this.form_tipo_control.reset()
          this.form_signos_peligro.reset()
          this.form_signos_vitales.reset()
          this.form_ex_general.reset()
          this.form_ex_obs.reset()
          this.form_ex_gin.reset()
          this.form_ex_lab.reset()
          this.form_clasificacion.reset()
          this.form_conducta.reset()
          this.form_consejeria.reset()


          this.openSnackBar('Consulta guardada exitosamente', 'green-snackbar')


        }
        this.cargando = false;
      }, err => {
        if (err.detail) {
          this.openSnackBar(err.detail, 'red-snackbar')
        } else {
          this.openSnackBar("Error al consumir el servicio", 'red-snackbar')
        }

        this.cargando = false
      })
      // console.log(data)
      // var keys = Object.keys(data);
      // var len = keys.length;
      // console.log(len)

    }





  }




  openSnackBar(message, tipo) {
    this._snackBar.open(message, "", {
      duration: 1500,
      panelClass: [tipo]
    });
  }



  ngOnDestroy() {
    if (this.sub_guardar_consulta) {
      this.sub_guardar_consulta.unsubscribe()
    }
  }
}

