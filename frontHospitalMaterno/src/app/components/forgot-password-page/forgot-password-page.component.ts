import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  constructor(
    private router: Router,
    private apiServices: ApiService,
    private _snackBar: MatSnackBar
  ) { 
    this.form_forgot= new FormGroup({
      correo: new FormControl('',[Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
  }


  form_forgot: FormGroup;

  email:""
  cargando=false;


  aceptar(){
    if(this.form_forgot.get('correo').hasError('email')){
      this.openSnackBar('Debe ingresar un correo válido','red-snackbar')
    }else if(this.form_forgot.invalid){ 
      this.openSnackBar('Debe ingresar un correo','red-snackbar')
    }else{
      this.cargando=true
      
      // console.log('hola')
      this.apiServices.cambiarCPass(this.form_forgot.get('correo').value).subscribe(data=>{
        this.openSnackBar('Revisa tu email para recuperar tu cuenta','red-snackbar')
        this.cargando=false
      },err=>{

        // console.log(err)
        if(err.detail){
          this.openSnackBar(err.detail,'red-snackbar')
        }else{
          this.openSnackBar('Error al consumir el servicio','red-snackbar')
        }

        this.cargando=false
      })
    }
  }


  close(){
    this.router.navigateByUrl('/login')
  }

  openSnackBar(message, tipo) {
    this._snackBar.open(message, "", {
      duration: 1500,
      panelClass: [tipo]
    });
  }
  
}
