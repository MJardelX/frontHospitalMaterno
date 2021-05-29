import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/Services/api.service';
import { DeptosServiceService } from 'src/app/Services/deptos-service.service';
import { FormPacientesComponent } from '../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-form-bebes',
  templateUrl: './form-bebes.component.html',
  styleUrls: ['./form-bebes.component.css']
})
export class FormBebesComponent implements OnInit {

  panelOpenState = false;
  form_pacientes: FormGroup

  departamentos = [];
  municipios = [];
  departamento_selected:any;
  municipio_selected:any
  constructor(
    private _builder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormBebesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService:ApiService,
    private deptoService: DeptosServiceService
  ) { 
    this.form_pacientes= _builder.group({})

    console.log(new Date())


    this.form_pacientes.addControl("peso", this.peso)
    this.form_pacientes.addControl("sexo", this.sexo)
    this.form_pacientes.addControl("fecha_nacimiento", this.fecha_nacimiento)
    //this.form_pacientes.addControl("pais", this.pais)
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


  ngOnInit(): void {
    this.departamentos = this.deptoService.obtener_departamentos();
  }

  
  // -----------------------------------------------------
  //              PARA AGREGAR FECHA PREDETERMINADA TENEMOS QUE CONVERTIR A formatDate("2021-05-18", "medium", 'en-GB'))

  matcher = new ErrorStateMatcher();
  enviarDatos(data){

    console.log(this.dpi_mama)
    if(this.form_pacientes.invalid){
      this.openSnackBar("Complete los campos requeridos","red-snackbar")
    }else{

      let fecha= formatDate(data.fecha_nacimiento, "yyyy-MM-dd", 'en-GB');
      this.apiService.agregar_bebe(
        this.dpi_mama,
        data.peso,
        data.sexo,
        fecha,
        data.departamento,
        data.municipio,
        data.pais
      ).subscribe(data=>{
        
       
          /* this.openSnackBar("Paciente ya registrada","red-snackbar") */
       
          this.openSnackBar("Bebe agregado Exitosamente","green-snackbar")
          this.apiService.getPersonsEmmit.emit("cargar");
          this.dialogRef.close();
       

      },err=>{
        this.openSnackBar("Error al agregar hijo","red-snackbar")
      })
      //this.openSnackBar("Hijo agregado Exitosamente","green-snackbar")
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


  select_depto(depto){
    this.municipios=this.deptoService.obtener_municipios(depto)
  }
}
