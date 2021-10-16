import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { PathService } from 'src/app/Services/path.service';

@Component({
  selector: 'app-conf-perfil',
  templateUrl: './conf-perfil.component.html',
  styleUrls: ['./conf-perfil.component.css']
})
export class ConfPerfilComponent implements OnInit, OnDestroy{


  usuario:any;
  constructor(
    private path_service: PathService,
    private _loc: Location,
    private _snackBar: MatSnackBar,
    private apiServices: ApiService,
    private router: ActivatedRoute
  ) {
    
    this.Location = this._loc.path();
    this.path_service.setPath(this.Location);
    this.token=localStorage.getItem('token')

    this.form_data_user= new FormGroup({})

    // this.id_usuario= this.router.snapshot.params['id_usuario']
   

    

    if(this.Location.indexOf('/configuracion-de-perfil')!=-1){
      // this.mostrarSide.emit(false)
      this.isConfigProfile=true
      this.usuario = JSON.parse(atob(localStorage.getItem('user')))
      this.id_usuario = this.usuario.id_usuario
    }else{
      this.isConfigProfile=false
      this.id_usuario= this.router.snapshot.params['id']
      this.sub_get_roles = this.apiServices.obtener_roles(this.token).subscribe(data => {
        // console.log(data)
        this.data_roles = data.data;
      })
      // this.mostrarSide.emit(true)
    }
  }


  
  isConfigProfile:boolean;
  Location: any;

  token:any


  form_data_user: FormGroup;  
  id_usuario:any;

  data_roles

  sub_get_roles:Subscription
  ngOnInit(): void {
    
    // this.id_usuario= this.router.snapshot.params['id_usuario']

    this.obtenerDataUsuario()

    

    
  }


  data_usuario
  sub_data_user: Subscription

  cargando=false;
  obtenerDataUsuario(){
    this.cargando=true;
    this.sub_data_user = this.apiServices.obtener_usuario(this.token, this.id_usuario).subscribe(data=>{

      this.cargando=false
      this.data_usuario=data.data[0]
      console.log(this.data_usuario)
      this.form_data_user= new FormGroup({
        'primer_nombre':new FormControl(this.data_usuario.primer_nombre,Validators.required),
        'segundo_nombre': new FormControl(this.data_usuario.segundo_nombre),
        'primer_apellido':new FormControl(this.data_usuario.primer_apellido,Validators.required),
        'segundo_apellido': new FormControl(this.data_usuario.segundo_apellido),
        'dpi':new FormControl(this.data_usuario.dpi,Validators.required),
        'correo':new FormControl(this.data_usuario.correo,[Validators.required]),
        // 'correo':new FormControl(this.data_usuario.correo,[Validators.required, Validators.email]),
        'telefono':new FormControl(this.data_usuario.telefono,Validators.required),
        'puesto':new FormControl(this.data_usuario.puesto,Validators.required),
        'nombre_usuario':new FormControl(this.data_usuario.nombre_usuario,Validators.required),
        'contraseña_actual':new FormControl("",Validators.required),
        'nueva_contraseña':new FormControl("",[Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),

        // 'nueva_contraseña':new FormControl("",[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
        'repetir_contraseña':new FormControl("",Validators.required),
        'rol': new FormControl("Rol",Validators.required)

      })

    },err=>{
      this.cargando=false;
      if(err.detail){
        this.openSnackBar(err.detail,'red-snackbar')
      }else{
        this.openSnackBar('Error al obtener los datos del usuario','red-snackbar')
      }
    })
  }

  drops = {
    nombre:false,
    usuario:false,
    correo:false,
    pass:false,
    telefono:false,
    puesto:false,
    dpi:false,
    roles:false
  }

  expandir(key){


    if(this.drops[key]==false){

    }
    
    this.drops[key]=!this.drops[key]
  }



  openSnackBar(message,tipo) {
    this._snackBar.open(message,"", {
      duration:1500,
      panelClass: [tipo]
    });
  }









  sub_update_dpi:Subscription
  actualizarDpi(){
    if(this.form_data_user.get('dpi').valid){
      let dpi= this.form_data_user.get('dpi').value
      this.sub_update_dpi = this.apiServices.actualizar_dato_usuario(this.token,this.id_usuario,'dpi',dpi).subscribe(data=>{
        // this.data_paciente.dpi=dpi
        this.obtenerDataUsuario()
        this.openSnackBar('Actualizado correctamente', 'green-snackbar')
      },err=>{

        if(err.detail.indexOf('Duplicate entry')!=-1){
          this.openSnackBar('Existe una persona registrada con el dpi ingresado', 'red-snackbar')
        }else{  
          this.openSnackBar(err, 'red-snackbar')
        }
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }

  sub_update_user:Subscription
  actualizarUser(){
    if(this.form_data_user.get('nombre_usuario').valid){
      let user= this.form_data_user.get('nombre_usuario').value
      this.sub_update_dpi = this.apiServices.actualizar_dato_usuario(this.token,this.id_usuario,'nombre_usuario',user).subscribe(data=>{
        // this.data_paciente.dpi=dpi
        this.obtenerDataUsuario()
        this.openSnackBar('Actualizado correctamente', 'green-snackbar')
      },err=>{

        if(err.detail.indexOf('Duplicate entry')!=-1){
          this.openSnackBar('Existe una persona registrada con el nombre de usuario ingresado', 'red-snackbar')
        }else{  
          this.openSnackBar(err, 'red-snackbar')
        }
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }


  sub_update_dato:Subscription
  actualizarDatoUsuario(atributo){
    if(this.form_data_user.get(atributo).valid){
      let valor= this.form_data_user.get(atributo).value
      this.sub_update_dato = this.apiServices.actualizar_dato_usuario(this.token,this.id_usuario,atributo,valor).subscribe(data=>{
        // this.data_paciente.dpi=dpi
        this.obtenerDataUsuario()
        this.openSnackBar('Actualizado correctamente', 'green-snackbar')
      },err=>{

        // conso
        console.log(err.detail.indexOf('1062')!=-1)
        if(err.detail.indexOf('1062')!=-1){
          this.openSnackBar('El correo se encuentra registrado', 'red-snackbar')
        }else{
          this.openSnackBar('Error al gurdar dato', 'red-snackbar')
        }

      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }



  sub_update_pass:Subscription
  actualizarPassUsuario(atributo){

    let contraseña_actual= this.form_data_user.get('contraseña_actual').value
    let nueva_contraseña= this.form_data_user.get('nueva_contraseña').value
    let repita_contraseña= this.form_data_user.get('repetir_contraseña').value



    if(this.form_data_user.get('nueva_contraseña').hasError('pattern')){
      this.openSnackBar('La contraseña no cumple con el patron establecido', 'red-snackbar')
    }else if(this.form_data_user.get('contraseña_actual').valid &&  
       this.form_data_user.get('nueva_contraseña').valid &&
       this.form_data_user.get('repetir_contraseña').valid){

        if(nueva_contraseña==repita_contraseña){
          this.sub_update_pass= this.apiServices.actualizarContraseñaUsuario(this.token, this.id_usuario, contraseña_actual, nueva_contraseña).subscribe(data=>{

            if(data.status=='Success'){
              this.openSnackBar('Contraseña actualizada correctamente', 'green-snackbar')
            }else{
              this.openSnackBar(data.detail, 'red-snackbar')
            }
          },err=>{
            console.log(err)
            this.openSnackBar(err.detail, 'red-snackbar')
          })

        }else{
          this.openSnackBar('Las nuevas contraseñas no coinciden', 'red-snackbar')
        }

    }else{
      this.openSnackBar('Debe llenar los tres campos de la contraseña', 'red-snackbar')
    }

    // if(this.form_data_user.get(atributo).valid){
    //   let valor= this.form_data_user.get(atributo).value
    //   this.sub_update_dato = this.apiServices.actualizar_dato_usuario(this.token,this.id_usuario,atributo,valor).subscribe(data=>{
    //     // this.data_paciente.dpi=dpi
    //     this.obtenerDataUsuario()
    //     this.openSnackBar('Actualizado correctamente', 'green-snackbar')
    //   },err=>{
    //     this.openSnackBar('Error al gurdar dato', 'red-snackbar')
    //   })


    // }else{
    //   this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    // }
  }



  sub_update_nombre:Subscription
  actualizarNombre(){
    if(this.form_data_user.get('primer_nombre').valid && this.form_data_user.get('primer_apellido').valid){
    
        
      this.sub_update_nombre = this.apiServices.actualizar_nombre_usuario(
                            this.token,
                            this.id_usuario,
                            this.form_data_user.get('primer_nombre').value,
                            this.form_data_user.get('segundo_nombre').value,
                            this.form_data_user.get('primer_apellido').value,
                            this.form_data_user.get('segundo_apellido').value).subscribe(data=>{
                              
          this.obtenerDataUsuario()
          this.openSnackBar('Actualizado correctamente', 'green-snackbar')

      },err=>{
        this.openSnackBar('Error al guardar dato', 'red-snackbar')
      })


    }else{
      this.openSnackBar('Debe introducir un valor válido', 'red-snackbar')
    }
  }











  roles = []

  agregarRol() {
    
    let index_rol = this.form_data_user.get('rol').value
    // console.log(index_rol)
    let rol= this.data_roles[index_rol]
    if (index_rol != "Rol") {
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
    // console.log(this.roles)
  }


  sub_update_roles:Subscription
  actualizarRoles(){
    if(this.roles.length!=0){
    
      let user_roles=[]
      this.roles.forEach(element=>{
        user_roles.push(element.id_rol)
      })

      this.sub_update_roles = this.apiServices.actualizar_roles_usuario(this.token,this.id_usuario,user_roles).subscribe(data=>{
        if(data.status=='Success'){
          this.obtenerDataUsuario()
          this.roles=[]
          this.form_data_user.get('rol').setValue('Rol')
          this.openSnackBar('Roles actualizados exitosamente', 'green-snackbar')
        }else{
          this.openSnackBar(data.detail, 'red-snackbar')
        }
      },err=>{
          this.openSnackBar('Error al guardar dato', 'red-snackbar')
      })
      // console.log(user_roles)
      // this.sub_update_roles = this.apiServices.actualizar_nombre_usuario(
      //                       this.token,
      //                       this.id_usuario,
      //                       this.form_data_user.get('primer_nombre').value,
      //                       this.form_data_user.get('segundo_nombre').value,
      //                       this.form_data_user.get('primer_apellido').value,
      //                       this.form_data_user.get('segundo_apellido').value).subscribe(data=>{
                              
      //     this.obtenerDataUsuario()
      //     this.openSnackBar('Actualizado correctamente', 'green-snackbar')

      // },err=>{
      //   this.openSnackBar('Error al guardar dato', 'red-snackbar')
      // })


    }else{
      this.openSnackBar('Debe agregar un rol', 'red-snackbar')
    }
  }






  ngOnDestroy(){
    if(this.sub_data_user){
      this.sub_data_user.unsubscribe()
    }

    if(this.sub_update_dpi){
      this.sub_update_dpi.unsubscribe()
    }
    if(this.sub_update_user){
      this.sub_update_user.unsubscribe()
    }

    if(this.sub_update_dato){
      this.sub_update_dato.unsubscribe()
    }

    if(this.sub_update_nombre){
      this.sub_update_nombre.unsubscribe()
    }

    if(this.sub_update_pass){
      this.sub_update_pass.unsubscribe()
    }

    if(this.sub_update_roles){
      this.sub_update_roles.unsubscribe()
    }


    if(this.sub_get_roles){
      this.sub_get_roles.unsubscribe()
    }

  }
}
