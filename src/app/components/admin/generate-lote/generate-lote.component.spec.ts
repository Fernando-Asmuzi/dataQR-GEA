import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLoteComponent } from './generate-lote.component';

describe('GenerateLoteComponent', () => {
  let component: GenerateLoteComponent;
  let fixture: ComponentFixture<GenerateLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateLoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
