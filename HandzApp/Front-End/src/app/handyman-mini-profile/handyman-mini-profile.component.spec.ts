import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandymanMiniProfileComponent } from './handyman-mini-profile.component';

describe('HandymanMiniProfileComponent', () => {
  let component: HandymanMiniProfileComponent;
  let fixture: ComponentFixture<HandymanMiniProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandymanMiniProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandymanMiniProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
