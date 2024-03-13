import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSanghamComponent } from './agent-sangham.component';

describe('AgentSanghamComponent', () => {
  let component: AgentSanghamComponent;
  let fixture: ComponentFixture<AgentSanghamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentSanghamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSanghamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
