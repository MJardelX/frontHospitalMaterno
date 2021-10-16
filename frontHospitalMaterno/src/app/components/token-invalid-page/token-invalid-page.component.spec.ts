import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenInvalidPageComponent } from './token-invalid-page.component';

describe('TokenInvalidPageComponent', () => {
  let component: TokenInvalidPageComponent;
  let fixture: ComponentFixture<TokenInvalidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenInvalidPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenInvalidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
