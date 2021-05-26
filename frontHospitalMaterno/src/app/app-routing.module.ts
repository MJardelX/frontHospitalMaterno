import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlPacietesComponent } from './components/control-pacietes/control-pacietes.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  
    { path: '', component: HomeComponent, pathMatch:'full' },
    { path: 'control-pacientes', component: ControlPacietesComponent, pathMatch:'full' },
    { path: 'graficas', component: GraficasComponent, pathMatch:'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
