import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateProductoComponent } from './generate-producto.component';

describe('GenerateProductoComponent', () => {
  let component: GenerateProductoComponent;
  let fixture: ComponentFixture<GenerateProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
