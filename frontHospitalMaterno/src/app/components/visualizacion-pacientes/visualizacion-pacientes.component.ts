import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-visualizacion-pacientes',
  templateUrl: './visualizacion-pacientes.component.html',
  styleUrls: ['./visualizacion-pacientes.component.css']
})
export class VisualizacionPacientesComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private router: Router,
    private apiServices: ApiService
  ) { }


  Location:any
  token:any

  data_pacientes:any;

  ngOnInit(): void {

    this.token=localStorage.getItem('token')
    this.Location=this._loc.path();
    this.path_service.setPath(this.Location);

    this.apiServices.obtener_pacientes(this.token).subscribe(data=>{
      // console.log(data.data)
      this.data_pacientes=data.data
    })
    
  }


  toAgregarPaciente(){
    this.router.navigateByUrl("/agregar-paciente")
  }

  toPaciente(id_paciente){
    this.router.navigateByUrl("/paciente/"+id_paciente);
  }
}
