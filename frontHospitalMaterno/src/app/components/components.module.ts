import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ControlPacietesComponent } from './control-pacietes/control-pacietes.component';
import { FormPacientesComponent } from './form-pacientes/form-pacientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBebesComponent } from './form-bebes/form-bebes.component';
import { GraficasComponent } from './graficas/graficas.component';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    HomeComponent,
    ControlPacietesComponent,
    FormPacientesComponent,
    FormBebesComponent,
    FormBebesComponent,
    GraficasComponent,
    GraficasComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // MatSliderModule,
    // MatSliderModule,
  ],
  exports: [
    HomeComponent,
    ControlPacietesComponent,
    FormPacientesComponent,
    FormBebesComponent,
    GraficasComponent
  ],
})
export class ComponentsModule {}
