import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPerfilComponent } from './conf-perfil.component';

describe('ConfPerfilComponent', () => {
  let component: ConfPerfilComponent;
  let fixture: ComponentFixture<ConfPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
