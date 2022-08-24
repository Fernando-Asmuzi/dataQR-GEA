import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmConvenioComponent } from './abm-convenio.component';

describe('AbmConvenioComponent', () => {
  let component: AbmConvenioComponent;
  let fixture: ComponentFixture<AbmConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmConvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
