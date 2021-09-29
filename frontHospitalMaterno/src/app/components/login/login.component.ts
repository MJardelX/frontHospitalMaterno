import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private router: Router,
  ) { }


  Location:any

  ngOnInit(): void {

    this.Location=this._loc.path();
    this.path_service.setPath(this.Location);
  }


  ingresar(){
    this.router.navigateByUrl('/pacientes')
  }
}
