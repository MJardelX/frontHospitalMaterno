import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-token-invalid-page',
  templateUrl: './token-invalid-page.component.html',
  styleUrls: ['./token-invalid-page.component.css']
})
export class TokenInvalidPageComponent implements OnInit {

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
