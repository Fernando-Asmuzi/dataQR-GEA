import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCategoriaComponent } from './generate-categoria.component';

describe('GenerateCategoriaComponent', () => {
  let component: GenerateCategoriaComponent;
  let fixture: ComponentFixture<GenerateCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
