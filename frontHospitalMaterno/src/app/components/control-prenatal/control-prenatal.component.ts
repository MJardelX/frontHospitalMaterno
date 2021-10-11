import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-control-prenatal',
  templateUrl: './control-prenatal.component.html',
  styleUrls: ['./control-prenatal.component.css']
})
export class ControlPrenatalComponent implements OnInit {

  constructor(
    private path_service: PathService,
    private _loc: Location,
  ) { }

  Location:any;
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);
  }


  migrante={
    si:false,
    no:true
  }
}
