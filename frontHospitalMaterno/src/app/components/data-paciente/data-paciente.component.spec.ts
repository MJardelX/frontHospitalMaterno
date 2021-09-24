import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPacienteComponent } from './data-paciente.component';

describe('DataPacienteComponent', () => {
  let component: DataPacienteComponent;
  let fixture: ComponentFixture<DataPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
