import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPersonalInformationComponent } from './checkout-personal-information.component';

describe('CheckoutPersonalInformationComponent', () => {
  let component: CheckoutPersonalInformationComponent;
  let fixture: ComponentFixture<CheckoutPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPersonalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
