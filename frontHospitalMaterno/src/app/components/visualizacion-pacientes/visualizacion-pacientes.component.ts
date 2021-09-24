import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }


  Location:any
  ngOnInit(): void {
    this.Location=this._loc.path();
    this.path_service.setPath(this.Location);
  }


  toAgregarPaciente(){
    this.router.navigateByUrl("/agregar-paciente")
  }

  toPaciente(){
    this.router.navigateByUrl('/paciente')
  }
}
