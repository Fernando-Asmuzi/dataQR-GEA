import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmDisenoComponent } from './abm-diseno.component';

describe('AbmDisenoComponent', () => {
  let component: AbmDisenoComponent;
  let fixture: ComponentFixture<AbmDisenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmDisenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmDisenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
