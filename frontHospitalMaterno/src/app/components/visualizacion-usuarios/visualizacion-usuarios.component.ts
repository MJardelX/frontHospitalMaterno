import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';
import { EliminarPacienteDialogComponent } from '../dialogs/eliminar-paciente-dialog/eliminar-paciente-dialog.component';
import { EliminarUsuarioDialogComponent } from '../dialogs/eliminar-usuario-dialog/eliminar-usuario-dialog.component';

@Component({
  selector: 'app-visualizacion-usuarios',
  templateUrl: './visualizacion-usuarios.component.html',
  styleUrls: ['./visualizacion-usuarios.component.css']
})
export class VisualizacionUsuariosComponent implements OnInit, OnDestroy {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  Location

  token: any

  sub_usuarios: Subscription
  data_usuarios: any


  cargando = false;
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);
    this.token = localStorage.getItem('token')

    this.cargando = true
    this.sub_usuarios = this.apiServices.obtener_usuarios(this.token).subscribe(data => {
      this.data_usuarios = data.data
      console.log(data)
      this.cargando = false
    }, err => {
      if (err.detail) {
        this.openSnackBar(err.detail, 'red-snackbar');
      } else {
        this.openSnackBar("Error al obtener usuarios", 'red-snackbar');
      }
      this.cargando = false
    })
  }


  ngOnDestroy() {
    this.sub_usuarios.unsubscribe()
  }




  openSnackBar(message, tipo) {
    this._snackBar.open(message, "", {
      duration: 1500,
      panelClass: [tipo]
    });
  }



  toConfiguracionUsuario(id_usuario) {
    this.router.navigateByUrl('/configuracion-de-usuario/' + id_usuario)
  }


  toNewUser() {
    this.router.navigateByUrl('/agregar-usuario')
  }


  eliminarDialog(id_usuario) {

    console.log(id_usuario)
    const dialogRef = this.dialog.open(EliminarUsuarioDialogComponent,
      {
        width: '300px',
        height: "425x",
        data: { id_usuario: id_usuario },
        panelClass: 'custom-modalbox',
        autoFocus: false
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'close') {
        this.cargando = true
        this.sub_usuarios = this.apiServices.obtener_usuarios(this.token).subscribe(data => {
          this.data_usuarios = data.data
          console.log(data)
          this.cargando = false
        }, err => {
          if (err.detail) {
            this.openSnackBar(err.detail, 'red-snackbar');
          } else {
            this.openSnackBar("Error al obtener usuarios", 'red-snackbar');
          }
          this.cargando = false
        })
      }
    });
  }

}
