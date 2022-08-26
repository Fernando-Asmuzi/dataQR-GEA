import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinculoInfoComponent } from './vinculo-info.component';

describe('VinculoInfoComponent', () => {
  let component: VinculoInfoComponent;
  let fixture: ComponentFixture<VinculoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinculoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinculoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
