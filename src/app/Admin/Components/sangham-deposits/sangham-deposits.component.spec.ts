import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanghamDepositsComponent } from './sangham-deposits.component';

describe('SanghamDepositsComponent', () => {
  let component: SanghamDepositsComponent;
  let fixture: ComponentFixture<SanghamDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanghamDepositsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanghamDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
