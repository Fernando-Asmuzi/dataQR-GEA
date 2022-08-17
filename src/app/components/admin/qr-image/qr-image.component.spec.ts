import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrImageComponent } from './qr-image.component';

describe('QrImageComponent', () => {
  let component: QrImageComponent;
  let fixture: ComponentFixture<QrImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
