import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PacientesInterface } from 'src/app/interfaces/pacientes-interface';
import { ApiService } from 'src/app/Services/api.service';
@Component({
  selector: 'app-form-pacientes',
  templateUrl: './form-pacientes.component.html',
  styleUrls: ['./form-pacientes.component.css']
})
export class FormPacientesComponent implements OnInit{
  

 

  panelOpenState = false;
  form_pacientes: FormGroup
  title="Agregar Paciente"
  constructor(
    private _builder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService:ApiService
  ) { 
    this.form_pacientes= _builder.group({})

    console.log(new Date())

    this.form_pacientes.addControl("primer_nombre", this.primer_nombre)
    this.form_pacientes.addControl("segundo_nombre", this.segundo_nombre)
    this.form_pacientes.addControl("primer_apellido", this.primer_apellido)
    this.form_pacientes.addControl("segundo_apellido", this.segundo_apellido)
    this.form_pacientes.addControl("fecha_nacimiento", this.fecha_nacimiento)
    this.form_pacientes.addControl("dpi", this.dpi)
    this.form_pacientes.addControl("pais", this.pais)
    this.form_pacientes.addControl("departamento", this.departamento)
    this.form_pacientes.addControl("municipio", this.municipio)
    this.form_pacientes.addControl("direccion", this.direccion)


    if(data){

      this.title="Editar Paciente"

      let fecha= formatDate(data.fecha_nacimiento, "medium", 'en-GB');
      this.form_pacientes.get("primer_nombre").setValue(data.primer_nombre)
      this.form_pacientes.get("segundo_nombre").setValue(data.segundo_nombre)
      this.form_pacientes.get("primer_apellido").setValue(data.primer_apellido)
      this.form_pacientes.get("segundo_apellido").setValue(data.segundo_apellido)
      this.form_pacientes.get("fecha_nacimiento").setValue(new Date(fecha))
      this.form_pacientes.get("dpi").setValue(data.dpi)
      this.form_pacientes.get("pais").setValue(data.pais)
      this.form_pacientes.get("departamento").setValue(data.departamento)
      this.form_pacientes.get("municipio").setValue(data.municipio)
      this.form_pacientes.get("direccion").setValue(data.direccion)
    }
  }

  primer_nombre = new FormControl('', [Validators.required]);
  segundo_nombre = new FormControl('',[])
  primer_apellido = new FormControl('',[Validators.required])
  segundo_apellido = new FormControl('',[])
  fecha_nacimiento = new FormControl("",[Validators.required])
  dpi = new FormControl('',[Validators.required])
  pais = new FormControl('',[Validators.required])
  departamento = new FormControl('',[Validators.required])
  municipio = new FormControl('',[Validators.required])
  direccion = new FormControl('',[Validators.required])

  ngOnInit(): void {}

  
  // -----------------------------------------------------
  //              PARA AGREGAR FECHA PREDETERMINADA TENEMOS QUE CONVERTIR A formatDate("2021-05-18", "medium", 'en-GB'))

  matcher = new ErrorStateMatcher();


  enviarDatos(data){

    console.log(data)
    if(this.form_pacientes.invalid){
      this.openSnackBar("Complete los campos requeridos","red-snackbar")
    }else{
      let fecha= formatDate(data.fecha_nacimiento, "yyyy-MM-dd", 'en-GB');
      console.log(fecha)
      
      /* let fecha= dateFor */
      /* si no hay data */
      if(this.data==undefined){
        this.apiService.agregar_paciente(
          data.primer_nombre,
          data.segundo_nombre,
          data.primer_apellido,
          data.segundo_apellido,
          data.dpi,
          fecha,
          data.departamento,
          data.municipio,
          data.direccion,
          data.pais
        ).subscribe(data=>{
          console.log(data)
        },err=>{
          console.log(err)
        })
      /* si hay data */
      }else{
        console.log("definido")

      }


      this.openSnackBar("Paciente registrado Exitosamente","green-snackbar")
    }

    /* this.dialogRef.close({"data":"hola"}); */
  }


  cerrar(){
    this.dialogRef.close();
  }

  openSnackBar(mensaje,clase) {
    this._snackBar.open(mensaje,"", {
      duration:1500,
      panelClass: [clase]
    });
  }


  // @ViewChild("myinput") myInputField: ElementRef;
  // ngAfterViewInit() {
  //   this.myInputField.nativeElement.blur();
  // }
   
}



