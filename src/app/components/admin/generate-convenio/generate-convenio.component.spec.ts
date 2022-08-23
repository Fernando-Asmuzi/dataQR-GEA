import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateConvenioComponent } from './generate-convenio.component';

describe('GenerateConvenioComponent', () => {
  let component: GenerateConvenioComponent;
  let fixture: ComponentFixture<GenerateConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateConvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
