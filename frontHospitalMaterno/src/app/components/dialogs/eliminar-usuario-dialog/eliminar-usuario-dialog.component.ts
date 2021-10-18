import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { FormPacientesComponent } from '../../form-pacientes/form-pacientes.component';

@Component({
  selector: 'app-eliminar-usuario-dialog',
  templateUrl: './eliminar-usuario-dialog.component.html',
  styleUrls: ['./eliminar-usuario-dialog.component.css']
})
export class EliminarUsuarioDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
  ) { }

  cargando=false;
  token:any;
  ngOnInit(): void {
    // console.log(this.data)
    this.token=localStorage.getItem('token')
  }


  close(){
    this.dialogRef.close('close')
  }


  sub_aceptar: Subscription
  aceptar(){
    this.apiServices.eliminarUsurio(this.token, this.data.id_usuario).subscribe(d=>{
      this.dialogRef.close('accept')
      this.openSnackBar('Usuario eliminado exitosamente', 'green-snackbar')
    },err=>{

      if(err.detail.indexOf('1451')!=-1){
        this.openSnackBar('No se puede eliminar al usuario debido a que ha participado en algunos expedientes', 'red-snackbar')
      }else{
        this.openSnackBar('Error al eliminar usuario', 'red-snackbar')
      }
      // console.log(err)
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
