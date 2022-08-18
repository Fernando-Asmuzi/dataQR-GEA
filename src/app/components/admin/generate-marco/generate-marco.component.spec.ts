import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMarcoComponent } from './generate-marco.component';

describe('GenerateMarcoComponent', () => {
  let component: GenerateMarcoComponent;
  let fixture: ComponentFixture<GenerateMarcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateMarcoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateMarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
