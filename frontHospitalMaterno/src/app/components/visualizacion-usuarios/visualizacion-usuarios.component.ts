import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-visualizacion-usuarios',
  templateUrl: './visualizacion-usuarios.component.html',
  styleUrls: ['./visualizacion-usuarios.component.css']
})
export class VisualizacionUsuariosComponent implements OnInit, OnDestroy{

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
  ) { }

  Location

  token:any

  sub_usuarios: Subscription
  data_usuarios:any
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);
    this.token=localStorage.getItem('token')

    this.sub_usuarios = this.apiServices.obtener_usuarios(this.token).subscribe(data=>{
      this.data_usuarios=data.data
      console.log(data)
    },err=>{
      if(err.detail){
        this.openSnackBar(err.detail,'red-snackbar');
      }
    })
  }


  ngOnDestroy(){
    this.sub_usuarios.unsubscribe()
  }


  
  
  openSnackBar(message,tipo) {
    this._snackBar.open(message,"", {
      duration:1500,
      panelClass: [tipo]
    });
  }


}
