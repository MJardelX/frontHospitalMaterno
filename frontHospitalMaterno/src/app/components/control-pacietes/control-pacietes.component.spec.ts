import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPacietesComponent } from './control-pacietes.component';

describe('ControlPacietesComponent', () => {
  let component: ControlPacietesComponent;
  let fixture: ComponentFixture<ControlPacietesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPacietesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPacietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
