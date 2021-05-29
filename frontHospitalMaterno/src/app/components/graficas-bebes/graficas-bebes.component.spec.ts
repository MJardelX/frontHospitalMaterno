import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasBebesComponent } from './graficas-bebes.component';

describe('GraficasBebesComponent', () => {
  let component: GraficasBebesComponent;
  let fixture: ComponentFixture<GraficasBebesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasBebesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasBebesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
