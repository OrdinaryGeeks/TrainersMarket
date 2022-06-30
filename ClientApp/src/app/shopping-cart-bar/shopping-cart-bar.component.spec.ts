import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartBarComponent } from './shopping-cart-bar.component';

describe('ShoppingCartBarComponent', () => {
  let component: ShoppingCartBarComponent;
  let fixture: ComponentFixture<ShoppingCartBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
