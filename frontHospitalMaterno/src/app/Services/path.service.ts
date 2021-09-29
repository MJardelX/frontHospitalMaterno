import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  // constructor() { }


  mostrarSide = new EventEmitter<any>();

  constructor() { }

  setPath(path:string){
    if(path.indexOf('/login')!=-1 || path.indexOf('/home')!=-1){
      this.mostrarSide.emit(false)
    }else{
      this.mostrarSide.emit(true)
    }
  }
}
