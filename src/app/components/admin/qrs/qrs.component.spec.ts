import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrsComponent } from './qrs.component';

describe('QrsComponent', () => {
  let component: QrsComponent;
  let fixture: ComponentFixture<QrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
