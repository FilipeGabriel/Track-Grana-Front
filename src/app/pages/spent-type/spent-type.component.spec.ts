import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentTypeComponent } from './spent-type.component';

describe('SpentTypeComponent', () => {
  let component: SpentTypeComponent;
  let fixture: ComponentFixture<SpentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpentTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
