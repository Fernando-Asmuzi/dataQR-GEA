import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateVinculacionComponent } from './generate-vinculacion.component';

describe('GenerateVinculacionComponent', () => {
  let component: GenerateVinculacionComponent;
  let fixture: ComponentFixture<GenerateVinculacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateVinculacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateVinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
