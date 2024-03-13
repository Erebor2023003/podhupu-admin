import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSanghamComponent } from './customer-sangham.component';

describe('CustomerSanghamComponent', () => {
  let component: CustomerSanghamComponent;
  let fixture: ComponentFixture<CustomerSanghamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSanghamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSanghamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
