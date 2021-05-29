import { Injectable } from '@angular/core';
import * as data from '../../assets/deptos_guatemala.json';
@Injectable({
  providedIn: 'root'
})
export class DeptosServiceService {

  departamentos=[]
  municipios=[]

  data_json:any
  constructor() {
    this.data_json=data.default
  }


  obtener_departamentos(){
    //console.log(data.default)
    
    let deptos=[]
    Object.keys(this.data_json).map(function (key){
      deptos.push(key)
    })

    this.departamentos=deptos
    return this.departamentos.slice()
  }

  obtener_municipios(departamento){
    this.municipios= this.data_json[departamento]

    return this.municipios.slice()
  }
}
