import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesterComponent } from './mester.component';

describe('MesterComponent', () => {
  let component: MesterComponent;
  let fixture: ComponentFixture<MesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
