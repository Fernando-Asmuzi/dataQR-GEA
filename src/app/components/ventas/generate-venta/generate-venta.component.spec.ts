import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateVentaComponent } from './generate-venta.component';

describe('GenerateVentaComponent', () => {
  let component: GenerateVentaComponent;
  let fixture: ComponentFixture<GenerateVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
