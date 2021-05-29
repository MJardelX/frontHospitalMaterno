import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private route: Router,
    private apiService:ApiService
  ) { }

  // interface Food {
  //   value: string;
  //   viewValue: string;
  // }

  // Foods:any

  selectedValue:any
  dataBases = [
    {value: 'mysql', viewValue: 'MySql'},
    {value: 'postgresql', viewValue: 'PostgeSQL'},
    {value: 'oracle', viewValue: 'Oracle'}
  ];
  
  ngOnInit(): void {
  }


  siguiente(){
    if(!this.selectedValue){
      this.openSnackBar()
    }else{
      this.apiService.set_database(this.selectedValue).subscribe(data=>{
        this.route.navigateByUrl("control-pacientes")
      })
      
      
    }
  }


  openSnackBar() {
    this._snackBar.open("Elija una base de datos","", {
      duration:1500,
      panelClass: ['red-snackbar']
    });
  }


  
}
