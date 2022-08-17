import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmLotesComponent } from './abm-lotes.component';

describe('AbmLotesComponent', () => {
  let component: AbmLotesComponent;
  let fixture: ComponentFixture<AbmLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmLotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
