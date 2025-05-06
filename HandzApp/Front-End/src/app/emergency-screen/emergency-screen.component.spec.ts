import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyScreenComponent } from './emergency-screen.component';

describe('EmergencyScreenComponent', () => {
  let component: EmergencyScreenComponent;
  let fixture: ComponentFixture<EmergencyScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmergencyScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergencyScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
