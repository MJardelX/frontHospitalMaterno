import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent implements OnInit {

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