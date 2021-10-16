import { flatten } from '@angular/compiler';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './Services/api.service';
import { PathService } from './Services/path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontHospitalMaterno';
  mostrarSide:boolean;

  constructor(
    private path_service: PathService,
    private cdr: ChangeDetectorRef,
    private route: Router,
    private apiServices: ApiService
  ){
    
  }


  usuario:any;
  show_usuario_module=false

  token_expired=false;
  ngOnInit(){

    // this.mostrarSide=true
    this.path_service.mostrarSide.subscribe((data_s) => {
      this.mostrarSide = data_s.show;

      if(data_s.path=="/token-expired" || data_s.path=="/token-invalid"){
        this.token_expired=true
      }else{
        this.token_expired=false;
      }
      // console.log(data_s)
      this.cdr.detectChanges();
    })

    // this.usuario=JSON.parse(localStorage.getItem('user'))
    // // this.usuario=  this.apiServices.usuario
    // console.log(this.usuario)


    // if(this.usuario?.roles.indexOf('Admin')!==-1){
    //   this.disable_usuarios_module=false
    // }else{
    //   this.disable_usuarios_module=true
    // }

  }


  logout(){
      localStorage.clear();
      this.route.navigateByUrl('/login')
  }


  actualizar(){
    this.usuario=JSON.parse(atob(localStorage.getItem('user')))
    // this.usuario=  this.apiServices.usuario
    // console.log(this.usuario)


    if(this.usuario?.roles.indexOf('Admin')!==-1){
      this.show_usuario_module=true
    }else{
      this.show_usuario_module=false
    }
  }


  toMiPerfil(){
    this.route.navigateByUrl('/configuracion-de-perfil')
  }


  navigateTo(url){
    this.route.navigateByUrl('/'+url)
  }
}
