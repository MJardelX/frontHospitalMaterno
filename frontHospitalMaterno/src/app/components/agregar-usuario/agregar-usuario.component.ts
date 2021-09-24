import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
  ) { }


  Location:any;
  ngOnInit(): void {
    this.Location=this._loc.path();
    this.path_service.setPath(this.Location);
  }

}
