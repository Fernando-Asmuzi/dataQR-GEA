import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoteComponent } from './card-lote.component';

describe('CardLoteComponent', () => {
  let component: CardLoteComponent;
  let fixture: ComponentFixture<CardLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
