import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionUsuariosComponent } from './visualizacion-usuarios.component';

describe('VisualizacionUsuariosComponent', () => {
  let component: VisualizacionUsuariosComponent;
  let fixture: ComponentFixture<VisualizacionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacionUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
