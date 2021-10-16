import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPacienteDialogComponent } from './eliminar-paciente-dialog.component';

describe('EliminarPacienteDialogComponent', () => {
  let component: EliminarPacienteDialogComponent;
  let fixture: ComponentFixture<EliminarPacienteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarPacienteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarPacienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
