import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanghamRecoveryComponent } from './sangham-recovery.component';

describe('SanghamRecoveryComponent', () => {
  let component: SanghamRecoveryComponent;
  let fixture: ComponentFixture<SanghamRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanghamRecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanghamRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
