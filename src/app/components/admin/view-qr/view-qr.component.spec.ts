import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQRComponent } from './view-qr.component';

describe('ViewQRComponent', () => {
  let component: ViewQRComponent;
  let fixture: ComponentFixture<ViewQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
