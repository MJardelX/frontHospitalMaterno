import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionPacientesComponent } from './visualizacion-pacientes.component';

describe('VisualizacionPacientesComponent', () => {
  let component: VisualizacionPacientesComponent;
  let fixture: ComponentFixture<VisualizacionPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacionPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacionPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
