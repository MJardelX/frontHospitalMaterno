import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-data-paciente',
  templateUrl: './data-paciente.component.html',
  styleUrls: ['./data-paciente.component.css']
})
export class DataPacienteComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
  ) { }

  Location:any;
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);
  }


  drops = {
    nombre:false,
    dpi:false,
    nacimiento:false,
    direccion:false,
    responsable:false,
    telefono:false,
    ocupacion:false,
    migrante:false,
    // responsable:false
    // puesto:false,
  }

  expandir(key){
    this.drops[key]=!this.drops[key]
  }


}
