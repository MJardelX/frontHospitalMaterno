import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-data-paciente',
  templateUrl: './data-paciente.component.html',
  styleUrls: ['./data-paciente.component.css']
})
export class DataPacienteComponent implements OnInit,OnDestroy {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private router: Router,
    // private route: Route
    private route: ActivatedRoute,
    private apiServices:ApiService,
    private _snackBar: MatSnackBar,
  ) { 

    this.form_data_paciente=new FormGroup({})
  }

  Location:any;

  id_paciente:any
  token:any;
  sub_obtener_paciente: Subscription


  form_data_paciente: FormGroup


  data_paciente:any;
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);
    this.id_paciente= this.route.snapshot.params['id_paciente']
    this.token=localStorage.getItem('token')

    this.obtenerDataPaciente()
  }


  drops = {
    nombre:false,
    dpi:false,
    nacimiento:false,
    direccion:false,
    responsable:false,
    telefono:false,
    ocupacion:false,
    migrante:false,
    // responsable:false
    // puesto:false,
  }

  expandir(key){
    this.drops[key]=!this.drops[key]
  }


  toControl(){
    this.router.navigateByUrl('/control-prenatal')
  }

  toNewControl(){
    
    // this.apiServices.selectPacienteExp.next({
    //   "hola":""
    // })

    this.router.navigateByUrl('/nuevo-control-prenatal/'+this.id_paciente)
  }


  ngOnDestroy(){
    if(this.sub_obtener_paciente){
      this.sub_obtener_paciente.unsubscribe()
    }


    if(this.sub_update_dpi){
      this.sub_update_dpi.unsubscribe()
    }

    if(this.sub_update_dato){
      this.sub_update_dato.unsubscribe()
    }

    if(this.sub_update_fecha){
      this.sub_update_fecha.unsubscribe()
    }

    if(this.sub_update_nombre){
      this.sub_update_nombre.unsubscribe()
    }

    if(this.sub_update_responsable){
      this.sub_update_responsable.unsubscribe()
    }

    if(this.sub_update_direccion){
      this.sub_update_direccion.unsubscribe()
    }
  }


  openSnackBar(message,tipo) {
    this._snackBar.open(message,"", {
      duration:1500,
      panelClass: [tipo]
    });
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



  sub_update_dato:Subscription
  actualizarDatoPaciente(atributo){
    if(this.form_data_paciente.get(atributo).valid){
      let valor= this.form_data_paciente.get(atributo).value
      this.sub_update_dato = this.apiServices.actualizar_dato_paciente(this.token,this.id_paciente,atributo,valor).subscribe(data=>{
        // this.data_paciente.dpi=dpi
        this.obtenerDataPaciente()
        this.openSnackBar('Actualizado correctamente', 'green-snackbar')
      },err=>{
        this.openSnackBar('Error al gurdar dato', 'red-snackbar')
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }

  sub_update_dpi:Subscription
  actualizarDpi(){
    if(this.form_data_paciente.get('dpi').valid){
      let dpi= this.form_data_paciente.get('dpi').value
      this.sub_update_dpi = this.apiServices.actualizar_dato_paciente(this.token,this.id_paciente,'dpi',dpi).subscribe(data=>{
        // this.data_paciente.dpi=dpi
        this.obtenerDataPaciente()
        this.openSnackBar('Actualizado correctamente', 'green-snackbar')
      },err=>{
        this.openSnackBar('Existe una persona registrada con el dpi ingresado', 'red-snackbar')
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }



  sub_update_fecha:Subscription
  actualizarFechaNacimiento(){
    if(this.form_data_paciente.get('fecha_nacimiento').valid){
      let fecha_nacimiento= this.form_data_paciente.get('fecha_nacimiento').value
      this.sub_update_dpi = this.apiServices.actualizar_dato_paciente(this.token,this.id_paciente,'fecha_nacimiento',fecha_nacimiento).subscribe(data=>{
        // this.data_paciente.dpi=dpi
        this.obtenerDataPaciente()
        this.openSnackBar('Actualizado correctamente', 'green-snackbar')
      },err=>{
        this.openSnackBar('Error al guardar dato', 'red-snackbar')
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }




  sub_update_responsable:Subscription
  actualizarResponsable(){
    if(this.form_data_paciente.get('nombre_responsable').valid && this.form_data_paciente.get('telefono_responsable').valid){
      let nombre_responsable= this.form_data_paciente.get('nombre_responsable').value
      this.sub_update_responsable = this.apiServices.actualizar_dato_paciente(this.token,this.id_paciente,'nombre_responsable',nombre_responsable).subscribe(data=>{
        // this.data_paciente.dpi=dpi

        let telefono= this.form_data_paciente.get('telefono_responsable').value
        this.sub_update_responsable = this.apiServices.actualizar_dato_paciente(this.token, this.id_paciente,'telefono_responsable',telefono).subscribe(data=>{
          this.obtenerDataPaciente()
          this.openSnackBar('Actualizado correctamente', 'green-snackbar')
        })
      },err=>{
        this.openSnackBar('Error al guardar dato', 'red-snackbar')
      })
    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }


  sub_update_nombre:Subscription
  actualizarNombre(){
    if(this.form_data_paciente.get('primer_nombre').valid && this.form_data_paciente.get('primer_apellido').valid){
    
        
      this.sub_update_nombre = this.apiServices.actualizar_nombre_paciente(
                            this.token,
                            this.id_paciente,
                            this.form_data_paciente.get('primer_nombre').value,
                            this.form_data_paciente.get('segundo_nombre').value,
                            this.form_data_paciente.get('primer_apellido').value,
                            this.form_data_paciente.get('segundo_apellido').value).subscribe(data=>{
                              
          this.obtenerDataPaciente()
          this.openSnackBar('Actualizado correctamente', 'green-snackbar')

      },err=>{
        this.openSnackBar('Error al guardar dato', 'red-snackbar')
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }


  sub_update_direccion:Subscription
  actualizarDireccion(){
    if(this.form_data_paciente.get('departamento').valid && this.form_data_paciente.get('municipio').valid && this.form_data_paciente.get('calle_avenida').valid){
    
        
      this.sub_update_nombre = this.apiServices.actualizar_direccion_paciente(
                            this.token,
                            this.id_paciente,
                            this.form_data_paciente.get('departamento').value,
                            this.form_data_paciente.get('municipio').value,
                            this.form_data_paciente.get('calle_avenida').value).subscribe(data=>{
                              
          this.obtenerDataPaciente()
          this.openSnackBar('Actualizado correctamente', 'green-snackbar')

      },err=>{
        this.openSnackBar('Error al guardar dato', 'red-snackbar')
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }



  obtenerDataPaciente(){
    this.sub_obtener_paciente=this.apiServices.obtener_paciente(this.token,this.id_paciente).subscribe(data=>{
      this.data_paciente=data.data[0]
      
      console.log(this.data_paciente)
      this.form_data_paciente=new FormGroup({
        'primer_nombre':new FormControl(this.data_paciente.primer_nombre,Validators.required),
        'segundo_nombre': new FormControl(this.data_paciente.segundo_nombre),
        'primer_apellido':new FormControl(this.data_paciente.primer_apellido,Validators.required),
        'segundo_apellido': new FormControl(this.data_paciente.segundo_apellido),
        'dpi':new FormControl(this.data_paciente.dpi,Validators.required),
        'fecha_nacimiento':new FormControl(this.data_paciente.fecha_nacimiento,Validators.required),
        'calle_avenida':new FormControl(this.data_paciente.calle_avenida,Validators.required),
        'municipio':new FormControl(this.data_paciente.municipio,Validators.required),
        'departamento':new FormControl(this.data_paciente.departamento,Validators.required),
        'telefono':new FormControl(this.data_paciente.telefono,Validators.required),
        'ocupacion':new FormControl(this.data_paciente.ocupacion,Validators.required),
        'migrante':new FormControl(this.data_paciente.migrante,Validators.required),
        'nombre_responsable':new FormControl(this.data_paciente.nombre_responsable,Validators.required),
        'telefono_responsable':new FormControl(this.data_paciente.telefono_responsable,Validators.required),
      })

      this.migrante[this.data_paciente.migrante]=true
      // console.log(this.data_paciente)
    },err=>{
      this.openSnackBar('Error al obtener datos de la paciente', 'red-snackbar')
    })
  }



}
