import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';
import { EliminarPacienteDialogComponent } from '../dialogs/eliminar-paciente-dialog/eliminar-paciente-dialog.component';

@Component({
  selector: 'app-visualizacion-pacientes',
  templateUrl: './visualizacion-pacientes.component.html',
  styleUrls: ['./visualizacion-pacientes.component.css']
})
export class VisualizacionPacientesComponent implements OnInit, OnDestroy {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private router: Router,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }


  Location: any
  token: any

  data_pacientes: any;

  p: number = 1;



  cargando = false;
  sub_obtener_pacientes: Subscription
  ngOnInit(): void {

    this.token = localStorage.getItem('token')
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);


    this.cargando = true;
    this.sub_obtener_pacientes = this.apiServices.obtener_pacientes(this.token).subscribe(data => {
      // console.log(data.data)
      this.data_pacientes = data.data
      this.cargando = false
    }, err => {
      this.openSnackBar('Error al obtener pacientes', "red-snackbar")
      this.cargando = false
    })

  }


  toAgregarPaciente() {
    this.router.navigateByUrl("/agregar-paciente")
  }

  toPaciente(id_paciente) {
    this.router.navigateByUrl("/paciente/" + id_paciente);
  }




  sub_filtro_exp: Subscription
  searchExpediente($event) {
    let valor = $event.target.value;
    // console.log(valor)


    if (valor.length != 0) {
      this.cargando = true
      this.sub_filtro_exp = this.apiServices.filtrarExpediente(this.token, valor).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al filtrar pacientes', "red-snackbar")
        this.cargando = false
      })
    } else {
      this.cargando = true
      this.sub_obtener_pacientes = this.apiServices.obtener_pacientes(this.token).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al obtener pacientes', "red-snackbar")
        this.cargando = false
      })
    }
  }


  sub_filtro_nombre: Subscription
  searchNombre($event) {
    let valor = $event.target.value;
    // console.log(valor)
    if (valor.length != 0) {
      this.cargando = true
      this.sub_filtro_exp = this.apiServices.filtrarNombre(this.token, valor).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al filtrar pacientes', "red-snackbar")
        this.cargando = false
      })
    } else {
      this.cargando = true
      this.sub_obtener_pacientes = this.apiServices.obtener_pacientes(this.token).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al obtener pacientes', "red-snackbar")
        this.cargando = false
      })
    }
  }


  sub_filtro_dpi: Subscription
  searchDPI($event) {
    let valor = $event.target.value;
    // console.log(valor)
    if (valor.length != 0) {
      this.cargando = true
      this.sub_filtro_exp = this.apiServices.filtrarDPI(this.token, valor).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al filtrar pacientes', "red-snackbar")
        this.cargando = false
      })
    } else {
      this.cargando = true
      this.sub_obtener_pacientes = this.apiServices.obtener_pacientes(this.token).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al obtener pacientes', "red-snackbar")
        this.cargando = false
      })
    }
  }

  sub_filtro_direccion: Subscription
  searchDireccion($event) {
    let valor = $event.target.value;
    // console.log(valor)
    if (valor.length != 0) {
      this.cargando = true
      this.sub_filtro_exp = this.apiServices.filtrarDireccion(this.token, valor).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al filtrar pacientes', "red-snackbar")
        this.cargando = false
      })
    } else {
      this.cargando = true
      this.sub_obtener_pacientes = this.apiServices.obtener_pacientes(this.token).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al obtener pacientes', "red-snackbar")
        this.cargando = false
      })
    }
  }



  sub_filtro_edad: Subscription
  searchEdad($event) {
    let valor = $event.target.value;
    // console.log(valor)
    if (valor.length != 0) {
      this.cargando = true
      this.sub_filtro_exp = this.apiServices.filtrarEdad(this.token, valor).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al filtrar pacientes', "red-snackbar")
        this.cargando = false
      })
    } else {
      this.cargando = true
      this.sub_obtener_pacientes = this.apiServices.obtener_pacientes(this.token).subscribe(data => {
        // console.log(data.data)
        this.data_pacientes = data.data
        this.cargando = false
      }, err => {
        this.openSnackBar('Error al obtener pacientes', "red-snackbar")
        this.cargando = false
      })
    }
  }


  ngOnDestroy() {

    if (this.sub_obtener_pacientes) {
      this.sub_obtener_pacientes.unsubscribe()
    }

    if (this.sub_filtro_exp) {
      this.sub_filtro_exp.unsubscribe()
    }

    if (this.sub_filtro_nombre) {
      this.sub_filtro_nombre.unsubscribe()
    }

    if (this.sub_filtro_dpi) {
      this.sub_filtro_dpi.unsubscribe()
    }

    if (this.sub_filtro_edad) {
      this.sub_filtro_edad.unsubscribe()
    }

    if (this.sub_filtro_direccion) {
      this.sub_filtro_direccion
    }
  }


  openSnackBar(message, tipo) {
    this._snackBar.open(message, "", {
      duration: 1500,
      panelClass: [tipo]
    });
  }


  eliminarDialog(id_paciente) {

    // console.log(id_paciente)
    const dialogRef = this.dialog.open(EliminarPacienteDialogComponent,
      {
        width: '300px',
        height: "425x",
        data: { id_paciente: id_paciente },
        panelClass: 'custom-modalbox',
        autoFocus: false
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'close') {
        this.cargando = true;
        this.sub_obtener_pacientes = this.apiServices.obtener_pacientes(this.token).subscribe(data => {
          // console.log(data.data)
          this.data_pacientes = data.data
          this.cargando = false
        }, err => {
          this.openSnackBar('Error al obtener pacientes', "red-snackbar")
          this.cargando = false
        })
      }
    });
  }
}
