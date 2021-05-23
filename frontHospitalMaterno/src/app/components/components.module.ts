import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [HomeComponent,HomeComponent],
  imports: [
    CommonModule,
    // MatSliderModule,
    // MatSliderModule,
  ],
  exports:[HomeComponent]

})
export class ComponentsModule { }
