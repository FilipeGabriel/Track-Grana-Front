import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentCardComponent } from './spent-card.component';

describe('SpentCardComponent', () => {
  let component: SpentCardComponent;
  let fixture: ComponentFixture<SpentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpentCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
