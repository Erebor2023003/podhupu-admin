import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanghamComponent } from './sangham.component';

describe('SanghamComponent', () => {
  let component: SanghamComponent;
  let fixture: ComponentFixture<SanghamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanghamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanghamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
