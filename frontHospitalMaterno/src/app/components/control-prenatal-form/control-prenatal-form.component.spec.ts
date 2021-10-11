import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPrenatalFormComponent } from './control-prenatal-form.component';

describe('ControlPrenatalFormComponent', () => {
  let component: ControlPrenatalFormComponent;
  let fixture: ComponentFixture<ControlPrenatalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlPrenatalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPrenatalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
