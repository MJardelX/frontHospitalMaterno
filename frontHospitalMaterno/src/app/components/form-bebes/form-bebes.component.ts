import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormPacientesComponent } from '../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-form-bebes',
  templateUrl: './form-bebes.component.html',
  styleUrls: ['./form-bebes.component.css']
})
export class FormBebesComponent implements OnInit {

  panelOpenState = false;
  form_pacientes: FormGroup
  constructor(
    private _builder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormBebesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.form_pacientes= _builder.group({})

    console.log(new Date())


    this.form_pacientes.addControl("peso", this.peso)
    this.form_pacientes.addControl("sexo", this.sexo)
    this.form_pacientes.addControl("fecha_nacimiento", this.fecha_nacimiento)
    this.form_pacientes.addControl("pais", this.pais)
    this.form_pacientes.addControl("departamento", this.departamento)
    this.form_pacientes.addControl("municipio", this.municipio)



    this.dpi_mama=data.dpi



    // if(data.dpi){
    //   let fecha= formatDate(data.fecha_nacimiento, "medium", 'en-GB');
    //   this.form_pacientes.get("fecha_nacimiento").setValue(new Date(fecha))
    //   this.form_pacientes.get("pais").setValue(data.pais)
    //   this.form_pacientes.get("departamento").setValue(data.departamento)
    //   this.form_pacientes.get("municipio").setValue(data.municipio)
      
    // }
  }


  dpi_mama:any

 
  peso = new FormControl("",[Validators.required])
  sexo = new FormControl("",[Validators.required])
  fecha_nacimiento = new FormControl("",[Validators.required])

  pais = new FormControl('',[Validators.required])
  departamento = new FormControl('',[Validators.required])
  municipio = new FormControl('',[Validators.required])


  ngOnInit(): void {}

  
  // -----------------------------------------------------
  //              PARA AGREGAR FECHA PREDETERMINADA TENEMOS QUE CONVERTIR A formatDate("2021-05-18", "medium", 'en-GB'))

  matcher = new ErrorStateMatcher();
  enviarDatos(data){

    console.log(this.dpi_mama)
    if(this.form_pacientes.invalid){
      this.openSnackBar("Complete los campos requeridos","red-snackbar")
    }else{
      this.openSnackBar("Hijo agregado Exitosamente","green-snackbar")
    }
    // this.dialogRef.close({"data":"hola"});
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
