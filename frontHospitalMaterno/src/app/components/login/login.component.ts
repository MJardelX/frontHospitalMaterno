import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';
// import * as shajs from 'sha.js'
import {Md5} from 'ts-md5/dist/md5';
import * as bcrypt from 'bcryptjs';

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
    private apiServices: ApiService,
    private _snackBar: MatSnackBar,
  ) { 
    this.form_login= new FormGroup({
      'username':new FormControl('',Validators.required),
      "password":new FormControl('', Validators.required)
    })
  }


  token:any


  form_login:FormGroup
  Location:any
  // usuario:any


  ngOnInit(): void {

    this.Location=this._loc.path();
    this.path_service.setPath(this.Location);


    
    


    // this.apiServices.obtener_pacientes(this.token).subscribe(data=>{
    //   console.log(data)
    // })
  }



  cargando=false;
  ingresar(){
    // this.router.navigateByUrl('/pacientes')
    let data_login=this.form_login.getRawValue()


    // const md5 = new Md5();
    // let password = md5.appendStr(data_login.password).end();


    // const salt = bcrypt.genSaltSync(10);
    // let pass = bcrypt.hashSync(data_login.password, 10);
    // console.log(pass)

    if(this.form_login.valid){
      this.cargando=true
      this.apiServices.login(this.token, data_login.username, data_login.password).subscribe(data=>{
        // console.log(data)
  
        this.token=data.token
        localStorage.setItem('token', btoa(this.token));

        localStorage.setItem('user', btoa(JSON.stringify(data.data)))
        // this.apiServices.usuario=data.data;
        this.openSnackBar('Bienvenido','green-snackbar');


        this.cargando=false
        this.router.navigateByUrl('/pacientes')
      },err=>{

        if(err.detail){
          this.openSnackBar(err.detail,'red-snackbar');
        }else{
          this.openSnackBar("Error al consumir el servicio",'red-snackbar');
        }
        this.cargando=false
        // console.log(err)
        // console.log(err.detail)
        // console.log(err)
      })

    }else{
      this.openSnackBar("Debe ingresar usuario y contraseña",'red-snackbar');
    }
  }



  openSnackBar(message,tipo) {
    this._snackBar.open(message,"", {
      duration:1500,
      panelClass: [tipo]
    });
  }


  toForgot(){
    this.router.navigateByUrl('forgot-password')
  }
}
