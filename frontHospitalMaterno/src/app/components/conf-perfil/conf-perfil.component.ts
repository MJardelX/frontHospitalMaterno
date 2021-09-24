import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-conf-perfil',
  templateUrl: './conf-perfil.component.html',
  styleUrls: ['./conf-perfil.component.css']
})
export class ConfPerfilComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
  ) { }

  Location: any;
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);
  }


  drops = {
    nombre:false,
    usuario:false,
    correo:false,
    pass:false,
    telefono:false,
    puesto:false,
  }

  expandir(key){


    if(this.drops[key]==false){

    }
    
    this.drops[key]=!this.drops[key]
  }



}
