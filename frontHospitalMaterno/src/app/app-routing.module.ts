import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { ConfPerfilComponent } from './components/conf-perfil/conf-perfil.component';
import { ControlPacietesComponent } from './components/control-pacietes/control-pacietes.component';
import { ControlPrenatalFormComponent } from './components/control-prenatal-form/control-prenatal-form.component';
import { ControlPrenatalComponent } from './components/control-prenatal/control-prenatal.component';
import { DataPacienteComponent } from './components/data-paciente/data-paciente.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TokenExpiredPageComponent } from './components/token-expired-page/token-expired-page.component';
import { TokenInvalidPageComponent } from './components/token-invalid-page/token-invalid-page.component';
import { VisualizacionPacientesComponent } from './components/visualizacion-pacientes/visualizacion-pacientes.component';
import { VisualizacionUsuariosComponent } from './components/visualizacion-usuarios/visualizacion-usuarios.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { SaludAuthGuard } from './guards/salud-auth.guard';

const routes: Routes = [
  
    { path: '', component: HomeComponent, pathMatch:'full' },
    // { path: 'control-pacientes', component: ControlPacietesComponent, pathMatch:'full' },
    // { path: 'graficas', component: GraficasComponent, pathMatch:'full' },
    { path: 'login', component: LoginComponent, pathMatch:'full' },
    { path: 'pacientes', component: VisualizacionPacientesComponent, pathMatch:'full', canActivate:[AuthGuard]},
    { path: 'agregar-paciente', component: FormPacienteComponent, pathMatch:'full', canActivate:[AuthGuard]},
    { path: 'agregar-usuario', component: AgregarUsuarioComponent, pathMatch:'full', canActivate:[AuthGuard]},
    { path: 'configuracion-de-perfil', component: ConfPerfilComponent, pathMatch:'full', canActivate:[AuthGuard]},
    { path: 'configuracion-de-usuario/:id', component: ConfPerfilComponent, pathMatch:'full', canActivate:[AuthGuard,AdminAuthGuard]},
    { path: 'paciente/:id_paciente', component: DataPacienteComponent, pathMatch:'full', canActivate:[AuthGuard]},
    { path: 'usuarios', component: VisualizacionUsuariosComponent, pathMatch:'full', canActivate:[AuthGuard,AdminAuthGuard]},
    { path: 'control-prenatal/:id_paciente/:id_control', component: ControlPrenatalComponent, pathMatch:'full', canActivate:[AuthGuard,SaludAuthGuard]},
    { path: 'nuevo-control-prenatal/:id_paciente', component: ControlPrenatalFormComponent, pathMatch:'full', canActivate:[AuthGuard, SaludAuthGuard]},
    { path: 'token-expired', component: TokenExpiredPageComponent, pathMatch:'full' },
    { path: 'token-invalid', component: TokenInvalidPageComponent, pathMatch:'full' },
    { path: 'forgot-password', component: ForgotPasswordPageComponent, pathMatch:'full' },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
