import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBebesComponent } from './form-bebes.component';

describe('FormBebesComponent', () => {
  let component: FormBebesComponent;
  let fixture: ComponentFixture<FormBebesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBebesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBebesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
