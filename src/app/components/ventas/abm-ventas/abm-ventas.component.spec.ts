import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmVentasComponent } from './abm-ventas.component';

describe('AmbVentasComponent', () => {
  let component: AbmVentasComponent;
  let fixture: ComponentFixture<AbmVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
