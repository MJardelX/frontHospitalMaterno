import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private _snackBar: MatSnackBar,
    private apiServices:ApiService,
    private router: Router,
  ) { 
    this.form_data_paciente=new FormGroup({
      'primer_nombre':new FormControl("",Validators.required),
      'segundo_nombre': new FormControl(""),
      'primer_apellido':new FormControl("",Validators.required),
      'segundo_apellido': new FormControl(""),
      'dpi':new FormControl("",Validators.required),
      'fecha_nacimiento':new FormControl("",Validators.required),
      'calle_avenida':new FormControl("",Validators.required),
      'municipio':new FormControl("",Validators.required),
      'departamento':new FormControl("Chimaltenango",Validators.required),
      'telefono':new FormControl(" "),
      'ocupacion':new FormControl("",Validators.required),
      'migrante':new FormControl("",Validators.required),
      'nombre_responsable':new FormControl(" "),
      'telefono_responsable':new FormControl(" "),
      'id_expediente': new FormControl('',Validators.required),
      'fecha_creacion_expediente': new FormControl('',Validators.required),
    })
  }

  Location:any;

  token:any

  form_data_paciente:FormGroup


  // usuario:any;
  ngOnInit(): void {
    this.Location=this._loc.path();
    this.path_service.setPath(this.Location);
    this.token=localStorage.getItem('token')
    
    // this.usuario= JSON.parse(localStorage.getItem('user'))
    // console.log(this.usuario)
  }


  migrante = {
    SI: false,
    NO: false
  }
  seleccionar_migrante(value) {
    // if()
    this.migrante['SI'] = false
    this.migrante['NO'] = false

    // if('si'){
    // }else{
    // }
    this.migrante[value] = !this.migrante[value]
    this.form_data_paciente.get('migrante').setValue(value);

    // if(){

    // }
  }



  cargando=false
  sub_guardar_paciente: Subscription
  guardar(){
    // this.form_data_paciente.get('id_usuario').setValue(this.usuario.id_usuario)
    // console.log(this.form_data_paciente.getRawValue())

    

    // console.log(data_paciente)

    let data = this.form_data_paciente.getRawValue()
    if (data['telefono']==null){
        data['telefono']=" "
    }

    if (data['telefono_responsable']==null){
      data['telefono_responsable']=" "
    }

    if (data['nombre_responsable']==null){
      data['nombre_responsable']=" "
    }


    if(this.form_data_paciente.valid){


      // this.form_data_paciente.addControl({},)

      this.cargando=true

      let data_paciente = this.form_data_paciente.getRawValue()
      let fecha_nacimiento = moment(data_paciente.fecha_nacimiento, 'MM/DD/YYYY').format('YYYY-MM-DD')
      let fecha_creacion_expediente = moment(data_paciente.fecha_creacion_expediente, 'MM/DD/YYYY').format('YYYY-MM-DD')
      data_paciente.fecha_nacimiento = fecha_nacimiento;
      data_paciente.fecha_creacion_expediente  = fecha_creacion_expediente;

      this.sub_guardar_paciente= this.apiServices.agregarPaciente(this.token, data_paciente).subscribe(data=>{
        if(data.status=='Success'){
          let id_paciente= data.data['id_paciente']
          this.form_data_paciente.reset()
          this.migrante['SI'] = false
          this.migrante['NO'] = false
          this.openSnackBar('Paciente guardada exitosamente',"green-snackbar")


        }else{
          this.openSnackBar(data.detail,"red-snackbar")
        }

        this.cargando=false

      },err=>{
        if(err.detail){
          this.openSnackBar(err.detail,"red-snackbar")
        }else{
          this.openSnackBar(err,"red-snackbar")
        }

        this.cargando=false
      })
    }else{
      this.openSnackBar('Debe completar los campos requeridos',"red-snackbar")
    }
  }

  openSnackBar(message,tipo) {
    this._snackBar.open(message,"", {
      duration:1500,
      panelClass: [tipo]
    });
  }



  // irAPacientes(){

  // }
}
