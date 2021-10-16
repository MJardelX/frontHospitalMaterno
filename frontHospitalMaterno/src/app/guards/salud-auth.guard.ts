import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaludAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let usuario = JSON.parse(atob(localStorage.getItem('user')))
      // console.log(usuario)


      let allow=false
      usuario.roles.forEach(element => {
        if(element=='Empleado Salud'){
          console.log(element)
          allow = true
        }  
      });
      // console.log(allow)
      if(!allow){
        this.router.navigateByUrl('/pacientes')
        this.openSnackBar('No tienes permisos suficientes para entrar al modulo','red-snackbar')
      }

      return allow;
  }


  openSnackBar(message, tipo) {
    this._snackBar.open(message, "", {
      duration: 1500,
      panelClass: [tipo]
    });
  }
  
}
