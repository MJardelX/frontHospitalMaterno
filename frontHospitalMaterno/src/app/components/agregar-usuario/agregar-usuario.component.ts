import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit, OnDestroy {

  constructor(
    private path_service: PathService,
    private _loc: Location,
    private _snackBar: MatSnackBar,
    private apiServices: ApiService,
    // private router: ActivatedRoute
  ) {

    this.form_data_user = new FormGroup({
      'primer_nombre': new FormControl("", Validators.required),
      'segundo_nombre': new FormControl(""),
      'primer_apellido': new FormControl("", Validators.required),
      'segundo_apellido': new FormControl(""),
      'dpi': new FormControl("", Validators.required),
      'usuario': new FormControl("", Validators.required),
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'telefono': new FormControl("", Validators.required),
      'puesto': new FormControl("", Validators.required),
      'rol': new FormControl("N/A", Validators.required),
    })
  }



  Location: any;

  sub_get_roles: Subscription
  token: any;


  form_data_user: FormGroup;
  data_roles: any;
  ngOnInit(): void {
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);

    this.token = localStorage.getItem('token')
    this.sub_get_roles = this.apiServices.obtener_roles(this.token).subscribe(data => {
      // console.log(data)
      this.data_roles = data.data;
    })

  }

  ngOnDestroy() {
    this.sub_get_roles.unsubscribe()
  }



  roles = []

  agregarRol() {
    
    let index_rol = this.form_data_user.get('rol').value
    // console.log(index_rol)
    let rol= this.data_roles[index_rol]
    if (index_rol != "N/A") {
      // console.log(this.form_data_user.get('rol').value)
      if (this.roles.length == 2) {
        this.openSnackBar('Solo puede asignar dos roles por usuario', "red-snackbar");
      } else {

        if(this.roles.indexOf(rol)==-1){
          this.roles.push(rol)
        }else{
          this.openSnackBar('No puede repetir roles', "red-snackbar");
        }
        // console.log()
      }

    } else {
      this.openSnackBar('Seleccione un rol', "red-snackbar");
    }
    // let id_rol
    // 
  }

  close(index){
    this.roles.splice(index, 1);
    console.log(this.roles)
  }



  sub_agregar_usuario: Subscription
  guardar(){

    // console.log(this.form_data_user.get('correo'))
    if(this.form_data_user.get('correo').hasError('email') || this.form_data_user.get('correo').hasError('required')){
      this.openSnackBar('Debe ingresar un correo válido', "red-snackbar"); 
    }else if(this.roles.length==0){
      this.openSnackBar('Debe seleccionar por lo menos un rol', "red-snackbar");
    }else if(this.form_data_user.invalid){  
      this.openSnackBar('Debe completar todos los campos', "red-snackbar");
    }else{
      // console.log(this.form_data_user.getRawValue())
      let user_roles=[]
      this.roles.forEach(element=>{
        user_roles.push(element.id_rol)
      })

      this.sub_agregar_usuario = this.apiServices.agregarUsuario(
        this.token,
        this.form_data_user.get('primer_nombre').value,
        this.form_data_user.get('segundo_nombre').value,
        this.form_data_user.get('primer_apellido').value,
        this.form_data_user.get('segundo_apellido').value,
        this.form_data_user.get('correo').value,
        this.form_data_user.get('telefono').value,
        this.form_data_user.get('puesto').value,
        this.form_data_user.get('usuario').value,
        this.form_data_user.get('dpi').value,
        user_roles
      ).subscribe(data=>{
        if(data.status=='Success'){
          this.openSnackBar('Usuario agregado exitosamente', "green-snackbar");
          this.form_data_user.reset()
          this.roles=[]
        }else{
          this.openSnackBar(data.detail, "red-snackbar");
        }
      },err=>{
        // console.log(err)
        this.openSnackBar('Error al consumir el servicio', "red-snackbar");
      })


      // console.log(user_roles)
    }
  }



  openSnackBar(message, tipo) {
    this._snackBar.open(message, "", {
      duration: 1500,
      panelClass: [tipo]
    });
  }
}
