import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMarcosComponent } from './abm-marcos.component';

describe('AbmMarcosComponent', () => {
  let component: AbmMarcosComponent;
  let fixture: ComponentFixture<AbmMarcosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmMarcosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMarcosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
