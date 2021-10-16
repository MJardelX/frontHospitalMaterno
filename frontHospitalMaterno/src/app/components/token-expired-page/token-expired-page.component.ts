import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-token-expired-page',
  templateUrl: './token-expired-page.component.html',
  styleUrls: ['./token-expired-page.component.css']
})
export class TokenExpiredPageComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.Location=this._loc.path();
    this.path_service.setPath(this.Location);
  }


  Location:any;


  aceptar(){
    this.route.navigateByUrl('/login')
  }
}
