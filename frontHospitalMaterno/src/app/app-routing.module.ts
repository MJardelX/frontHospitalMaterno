import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { ConfPerfilComponent } from './components/conf-perfil/conf-perfil.component';
import { ControlPacietesComponent } from './components/control-pacietes/control-pacietes.component';
import { DataPacienteComponent } from './components/data-paciente/data-paciente.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { VisualizacionPacientesComponent } from './components/visualizacion-pacientes/visualizacion-pacientes.component';

const routes: Routes = [
  
    { path: '', component: HomeComponent, pathMatch:'full' },
    { path: 'control-pacientes', component: ControlPacietesComponent, pathMatch:'full' },
    { path: 'graficas', component: GraficasComponent, pathMatch:'full' },
    { path: 'login', component: LoginComponent, pathMatch:'full' },
    { path: 'pacientes', component: VisualizacionPacientesComponent, pathMatch:'full' },
    { path: 'agregar-paciente', component: FormPacienteComponent, pathMatch:'full' },
    { path: 'agregar-usuario', component: AgregarUsuarioComponent, pathMatch:'full' },
    { path: 'configuracion-de-perfil', component: ConfPerfilComponent, pathMatch:'full' },
    { path: 'paciente', component: DataPacienteComponent, pathMatch:'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
