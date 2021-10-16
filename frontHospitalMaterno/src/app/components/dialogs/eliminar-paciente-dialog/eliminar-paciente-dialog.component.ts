import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { FormPacientesComponent } from '../../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-eliminar-paciente-dialog',
  templateUrl: './eliminar-paciente-dialog.component.html',
  styleUrls: ['./eliminar-paciente-dialog.component.css']
})
export class EliminarPacienteDialogComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<FormPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
  ) { }

  cargando=false;
  token:any;
  ngOnInit(): void {
    console.log(this.data)
    this.token=localStorage.getItem('token')
  }


  close(){
    this.dialogRef.close('close')
  }


  sub_aceptar: Subscription
  aceptar(){
    this.apiServices.eliminarPaciente(this.token, this.data.id_paciente).subscribe(d=>{
      this.dialogRef.close('accept')
      this.openSnackBar('Paciente eliminada exitosamente', 'green-snackbar')
    },err=>{

      if(err.detail.indexOf('1451')!=-1){
        this.openSnackBar('No se puede eliminar a la paciente porque cuenta con controles registrados', 'red-snackbar')
      }else{
        this.openSnackBar('Error al eliminar paciente', 'red-snackbar')
      }
      console.log(err)
    })
  }

  ngOnDestroy(){

    if(this.sub_aceptar){
      this.sub_aceptar.unsubscribe()
    }
  }


  openSnackBar(message,tipo) {
    this._snackBar.open(message,"", {
      duration:1500,
      panelClass: [tipo]
    });
  }
}
