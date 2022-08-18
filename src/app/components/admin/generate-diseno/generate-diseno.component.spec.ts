import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDisenoComponent } from './generate-diseno.component';

describe('GenerateDisenoComponent', () => {
  let component: GenerateDisenoComponent;
  let fixture: ComponentFixture<GenerateDisenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateDisenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDisenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
