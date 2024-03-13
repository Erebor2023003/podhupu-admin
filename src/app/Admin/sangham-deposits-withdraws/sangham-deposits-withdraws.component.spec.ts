import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanghamDepositsWithdrawsComponent } from './sangham-deposits-withdraws.component';

describe('SanghamDepositsWithdrawsComponent', () => {
  let component: SanghamDepositsWithdrawsComponent;
  let fixture: ComponentFixture<SanghamDepositsWithdrawsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanghamDepositsWithdrawsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanghamDepositsWithdrawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
