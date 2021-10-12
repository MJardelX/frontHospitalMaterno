import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { ConfPerfilComponent } from './components/conf-perfil/conf-perfil.component';
import { ControlPacietesComponent } from './components/control-pacietes/control-pacietes.component';
import { ControlPrenatalFormComponent } from './components/control-prenatal-form/control-prenatal-form.component';
import { ControlPrenatalComponent } from './components/control-prenatal/control-prenatal.component';
import { DataPacienteComponent } from './components/data-paciente/data-paciente.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { VisualizacionPacientesComponent } from './components/visualizacion-pacientes/visualizacion-pacientes.component';
import { VisualizacionUsuariosComponent } from './components/visualizacion-usuarios/visualizacion-usuarios.component';

const routes: Routes = [
  
    { path: '', component: HomeComponent, pathMatch:'full' },
    { path: 'control-pacientes', component: ControlPacietesComponent, pathMatch:'full' },
    { path: 'graficas', component: GraficasComponent, pathMatch:'full' },
    { path: 'login', component: LoginComponent, pathMatch:'full' },
    { path: 'pacientes', component: VisualizacionPacientesComponent, pathMatch:'full' },
    { path: 'agregar-paciente', component: FormPacienteComponent, pathMatch:'full' },
    { path: 'agregar-usuario', component: AgregarUsuarioComponent, pathMatch:'full' },
    { path: 'configuracion-de-perfil/:id_usuario', component: ConfPerfilComponent, pathMatch:'full' },
    { path: 'configuracion-de-usuario/:id', component: ConfPerfilComponent, pathMatch:'full' },
    { path: 'paciente/:id_paciente', component: DataPacienteComponent, pathMatch:'full' },
    { path: 'usuarios', component: VisualizacionUsuariosComponent, pathMatch:'full' },
    { path: 'control-prenatal/:id_control', component: ControlPrenatalComponent, pathMatch:'full' },
    { path: 'nuevo-control-prenatal/:id_paciente', component: ControlPrenatalFormComponent, pathMatch:'full' },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
